import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { Repository } from 'typeorm';
import { CreateFoundPetDto } from 'src/core/interfaces/found-pet.interface';
import { LostPetsService } from 'src/lost-pets/lost-pets.service';
import { EmailService } from 'src/email/email.service';
import { generateFoundPetEmailTemplate } from './templates/found-pet-email.template';
import { envs } from 'src/config/envs';
import {
  logger,
  trackEvent,
  trackException,
  trackMetric,
} from 'src/config/logger';

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepository: Repository<FoundPet>,
    private readonly lostPetsService: LostPetsService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<FoundPet[]> {
    return await this.foundPetRepository.find();
  }

  async create(dto: CreateFoundPetDto) {
    const start = Date.now();

    try {
      const foundPet = this.foundPetRepository.create({
        ...dto,
        location: {
          type: 'Point',
          coordinates: [dto.location.lng, dto.location.lat],
        },
      });

      await this.foundPetRepository.save(foundPet);
      logger.info(
        `Mascota encontrada registrada — especie: ${dto.species}, lat: ${dto.location.lat}, lng: ${dto.location.lng}`,
      );

      // Búsqueda por radio
      const nearbyLostPets = await this.lostPetsService.findActiveWithinRadius(
        dto.location.lat,
        dto.location.lng,
      );

      trackMetric('RadiusSearch.Results', nearbyLostPets.length);
      logger.info(
        `Búsqueda por radio completada — coincidencias: ${nearbyLostPets.length}`,
      );

      if (nearbyLostPets.length === 0) {
        trackEvent('FoundPet.NoMatches', {
          species: dto.species,
          lat: String(dto.location.lat),
          lng: String(dto.location.lng),
        });
        return foundPet;
      }

      // Envío de correos
      for (const lostPet of nearbyLostPets) {
        const html = generateFoundPetEmailTemplate(dto, lostPet);

        const emailSent = await this.emailService.sendEmail({
          to: envs.RECEIVER_EMAIL,
          subject: `🐾 Posible coincidencia: ${lostPet.name} fue encontrado cerca`,
          html,
        });

        if (emailSent) {
          trackEvent('FoundPet.EmailSent', {
            lostPetId: String(lostPet.id),
            lostPetName: lostPet.name,
            species: dto.species,
          });
          logger.info(
            `Correo enviado — mascota perdida: ${lostPet.name} (id: ${lostPet.id})`,
          );
        } else {
          logger.error(
            `Fallo al enviar correo — mascota perdida: ${lostPet.name} (id: ${lostPet.id})`,
          );
        }
      }

      trackEvent('FoundPet.WithMatches', {
        matches: String(nearbyLostPets.length),
        species: dto.species,
      });

      trackMetric('FoundPet.Create.Duration', Date.now() - start);

      return {
        ...foundPet,
        nearbyMatches: nearbyLostPets.length,
      };
    } catch (error) {
      trackException(error as Error, { endpoint: 'POST /found-pets' });
      logger.error(`Error en POST /found-pets: ${(error as Error).message}`);
      throw error;
    }
  }
}

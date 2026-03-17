import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { Repository } from 'typeorm';
import { CreateFoundPetDto } from 'src/core/interfaces/found-pet.interface';
import { LostPetsService } from 'src/lost-pets/lost-pets.service';
import { EmailService } from 'src/email/email.service';
import { generateFoundPetEmailTemplate } from './templates/found-pet-email.template';
import { envs } from 'src/config/envs';

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepository: Repository<FoundPet>,

    private readonly lostPetsService: LostPetsService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateFoundPetDto) {
    const foundPet = this.foundPetRepository.create({
      ...dto,
      location: {
        type: 'Point',
        coordinates: [dto.location.lng, dto.location.lat],
      },
    });

    await this.foundPetRepository.save(foundPet);

    const lostPet = await this.lostPetsService.findOneActive();

    if (!lostPet) return foundPet;

    const html = generateFoundPetEmailTemplate(dto, lostPet);

    await this.emailService.sendEmail({
      to: envs.RECEIVER_EMAIL,
      subject: 'Mascota encontrada 🐒',
      html,
    });

    return foundPet;
  }
}

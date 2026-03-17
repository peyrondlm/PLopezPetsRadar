import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { Repository } from 'typeorm';
import { CreateLostPetDto } from 'src/core/interfaces/lost-pet.interface';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
  ) {}

  async create(dto: CreateLostPetDto) {
    const lostPet = this.lostPetRepository.create({
      ...dto,
      location: {
        type: 'Point',
        coordinates: [dto.location.lng, dto.location.lat],
      },
    });

    return await this.lostPetRepository.save(lostPet);
  }

  async findOneActive() {
    return await this.lostPetRepository.findOne({
      where: { is_active: true },
    });
  }
}

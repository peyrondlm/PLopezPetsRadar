import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateLostPetDto } from 'src/core/interfaces/lost-pet.interface';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
    private readonly dataSource: DataSource,
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

  async findActiveWithinRadius(lat: number, lng: number): Promise<LostPet[]> {
    return await this.dataSource.query(
      `
    SELECT *,
      ST_AsGeoJSON(location)::json AS location,
      ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      ) AS distance
    FROM lost_pets
    WHERE is_active = true
      AND ST_DWithin(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        500
      )
    ORDER BY distance ASC
    `,
      [lng, lat],
    );
  }
}

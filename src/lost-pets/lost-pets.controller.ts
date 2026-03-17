import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import { CreateLostPetDto } from 'src/core/interfaces/lost-pet.interface';

@Controller('lost-pets')
export class LostPetsController {

  constructor(private readonly service: LostPetsService) {}

  @Post()
  create(@Body() dto: CreateLostPetDto) {
    return this.service.create(dto);
  }
}

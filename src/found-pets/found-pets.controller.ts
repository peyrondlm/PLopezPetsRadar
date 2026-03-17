import { Controller, Post, Body } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import { CreateFoundPetDto } from 'src/core/interfaces/found-pet.interface';

@Controller('found-pets')
export class FoundPetsController {

  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Post()
  create(@Body() dto: CreateFoundPetDto) {
    return this.foundPetsService.create(dto);
  }
}

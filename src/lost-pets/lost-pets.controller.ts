import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { LostPetsService } from './lost-pets.service';
import { CreateLostPetDto } from 'src/core/interfaces/lost-pet.interface';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly service: LostPetsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateLostPetDto) {
    return this.service.create(dto);
  }
}

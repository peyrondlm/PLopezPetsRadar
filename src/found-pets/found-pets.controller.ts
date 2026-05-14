import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FoundPetsService } from './found-pets.service';
import { CreateFoundPetDto } from 'src/core/interfaces/found-pet.interface';

@Controller('found-pets')
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.foundPetsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateFoundPetDto) {
    return this.foundPetsService.create(dto);
  }
}
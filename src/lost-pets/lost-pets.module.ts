import { Module } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import { LostPetsController } from './lost-pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lost-pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LostPet])],
  providers: [LostPetsService],
  controllers: [LostPetsController],
  exports: [LostPetsService],
})
export class LostPetsModule {}

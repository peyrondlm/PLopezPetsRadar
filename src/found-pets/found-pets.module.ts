import { Module } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/found-pet.entity';
import { LostPetsModule } from 'src/lost-pets/lost-pets.module';
import { EmailModule } from 'src/email/email.module';
import { FoundPetsController } from './found-pets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoundPet]),
    LostPetsModule,
    EmailModule
  ],
  providers: [FoundPetsService],
  controllers: [FoundPetsController],
})
export class FoundPetsModule {}

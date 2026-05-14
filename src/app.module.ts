import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { EmailModule } from './email/email.module';
import { envs } from './config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: envs.REDIS_HOST,
            port: envs.REDIS_PORT,
          },
        }),
        ttl: 60_000,
      }),
    }),
    LostPetsModule,
    FoundPetsModule,
    EmailModule,
  ],
})
export class AppModule {}

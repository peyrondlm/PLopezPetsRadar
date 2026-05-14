import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  logger.info(`PetsRadar API corriendo en puerto ${process.env.PORT}`);
}
bootstrap();

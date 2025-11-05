import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`Application listening on port ${port}`);
}

bootstrap();

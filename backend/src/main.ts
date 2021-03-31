import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api');
  app.use(helmet());
  // Auto-Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: '*',
  });
  app.set('trust proxy', 1); // ?
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 Minute
      max: 60, // limit each IP to 60 requests per windowMs
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('HouseApp')
    .setDescription('The API description of the HouseApp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

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
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // Set up Helmet
  app.use(helmet());
  // Set up rate limiting
  app.set('trust proxy', 1);
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 Minute
      max: 110, // limit each IP to 100 requests per windowMs
    }),
  );
  // Setup Swagger OpenAPI
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/api', app, document);
  // Auto-Validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

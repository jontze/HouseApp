import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  await app.listen(3000);
}
bootstrap();

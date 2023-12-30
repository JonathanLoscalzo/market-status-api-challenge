import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as df from 'dotenv-flow';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/exception-filters/http/http.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationException } from './core/exceptions/validation.exception';
import { ValidationExceptionFilter } from './core/exception-filters/validation/validation.filter';

async function bootstrap() {
  df.config({
    path: './environments/',
    node_env: process.env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule);

  addFilters(app);
  addPipes(app);
  addSwagger(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}

function addFilters(app) {
  // https://docs.nestjs.com/pipes
  // Pipes run inside the exceptions zone. This means that when a Pipe
  // throws an exception it is handled by the exceptions layer (global exceptions filter and any exceptions
  // filters that are applied to the current context)

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
}

function addSwagger(app) {
  // TODO: make it public just for dev
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Market Status API')
    .setDescription('Endpoints for Market Status API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

function addPipes(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );
}

bootstrap();

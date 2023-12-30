import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as df from 'dotenv-flow';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/exception-filters/http/http.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

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
  app.useGlobalFilters(new HttpExceptionFilter());
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

function addPipes(_app: INestApplication<any>) {
  _app;
}

bootstrap();

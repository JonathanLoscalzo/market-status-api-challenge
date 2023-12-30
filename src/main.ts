import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as df from 'dotenv-flow';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  df.config({
    path: './environments/',
    node_env: process.env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();

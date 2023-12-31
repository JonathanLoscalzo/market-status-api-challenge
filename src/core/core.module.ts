import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [LoggerMiddleware],
  exports: [HttpModule, LoggerMiddleware, ConfigModule],
})
export class CoreModule {}

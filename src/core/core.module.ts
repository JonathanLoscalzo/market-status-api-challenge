import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // LoggerModule.forRoot(),
    // DatabaseModule.forRoot(),
  ],
  providers: [],
  exports: [HttpModule],
})
export class CoreModule {}

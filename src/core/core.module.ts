import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // LoggerModule.forRoot(),
    // DatabaseModule.forRoot(),
  ],
  providers: [],
})
export class CoreModule {}

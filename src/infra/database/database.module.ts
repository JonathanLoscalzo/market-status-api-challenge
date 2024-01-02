import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import entities from './database.entities';
import { GlobalSubscriber, SoftRemoveSubscriber } from './database.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
          entities: entities,
        } as any;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [GlobalSubscriber, SoftRemoveSubscriber],
})
export class DatabaseModule {}

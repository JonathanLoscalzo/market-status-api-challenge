import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from 'src/core/core.module';
import { ResourcesModule } from 'src/resources/resources.module';

@Module({
  imports: [CoreModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

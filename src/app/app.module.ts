import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from 'src/core/core.module';
import { ResourcesModule } from 'src/resources/resources.module';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [CoreModule, InfraModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

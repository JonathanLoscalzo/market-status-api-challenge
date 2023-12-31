import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from '../database/database.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, CoreModule, DatabaseModule],
  controllers: [HealthController],
})
export class HealthcheckModule {}

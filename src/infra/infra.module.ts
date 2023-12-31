import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [DatabaseModule, HealthcheckModule],
})
export class InfraModule {}

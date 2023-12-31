import { Module } from '@nestjs/common';
import { MarketStatusModule } from './market-status/market-status.module';

@Module({
  imports: [MarketStatusModule],
})
export class ResourcesModule {}

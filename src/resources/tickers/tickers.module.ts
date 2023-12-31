import { Module } from '@nestjs/common';
import { TickersController } from './controllers/tickers.controller';
import { BitfinexPublicApi } from './services/bitfinex/bitfinex.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [TickersController],
  providers: [BitfinexPublicApi],
})
export class TickersModule {}

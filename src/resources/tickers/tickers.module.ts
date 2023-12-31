import { Module } from '@nestjs/common';
import { TickersController } from './controllers/tickers.controller';
import { BitfinexPublicApi } from './services/bitfinex/bitfinex.service';
import { CoreModule } from 'src/core/core.module';
import { UseCasesService } from './services/use-cases/use-cases.service';
import { GetOrderbookTipsAndMarketPriceUseCase } from './services/use-cases/get-orderbook-tips-and-market-price/get-orderbook-tips-and-market-price.service';

@Module({
  imports: [CoreModule],
  controllers: [TickersController],
  providers: [
    BitfinexPublicApi,
    UseCasesService,
    GetOrderbookTipsAndMarketPriceUseCase,
  ],
})
export class TickersModule {}

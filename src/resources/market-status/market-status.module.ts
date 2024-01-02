import { Module } from '@nestjs/common';
import { MarketStatusController } from './controllers/market-status.controller';
import { BitfinexPublicApi } from './services/bitfinex/bitfinex.service';
import { CoreModule } from 'src/core/core.module';
import { UseCasesService } from './services/use-cases/use-cases.service';
import { GetOrderbookTipsAndMarketPriceUseCase } from './services/use-cases/get-orderbook-tips-and-market-price/get-orderbook-tips-and-market-price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MarketStatus from './entities/market-price.entity';
import MarketStatusService from './services/market-status.service';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([MarketStatus])],
  controllers: [MarketStatusController],
  providers: [
    BitfinexPublicApi,
    UseCasesService,
    GetOrderbookTipsAndMarketPriceUseCase,
    MarketStatusService,
  ],
})
export class MarketStatusModule {}

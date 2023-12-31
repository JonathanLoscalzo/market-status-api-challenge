import { Injectable } from '@nestjs/common';
import { BitfinexPublicApi } from '../../bitfinex/bitfinex.service';

@Injectable()
export class GetOrderbookTipsAndMarketPriceUseCase {
  constructor(private readonly bitfinexService: BitfinexPublicApi) {}

  async execute(data: { buyer: string; seller: string }) {
    const [ticker, orderbook] = await Promise.all([
      this.bitfinexService.ticker(data.buyer, data.seller),
      this.bitfinexService.orderbook(data.buyer, data.seller),
    ]);

    // TODO: save to database

    return {
      bid: ticker.bid,
      ask: ticker.ask,
      marketPrice: ticker.lastPrice,
      orderbook: orderbook,
    };
  }
}

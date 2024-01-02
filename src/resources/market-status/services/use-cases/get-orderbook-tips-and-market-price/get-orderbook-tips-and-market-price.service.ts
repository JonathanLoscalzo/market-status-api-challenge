import { Injectable } from '@nestjs/common';
import { BitfinexPublicApi } from '../../bitfinex/bitfinex.service';
import { OrderbookTipsAndMarketPrice } from 'src/resources/market-status/dto/OrderbookTipsAndMarketPrice';
import MarketStatusService from '../../market-status.service';
import { CRYPTO_CURRENCY } from 'src/core/enums/crypto-currency.enum';

@Injectable()
export class GetOrderbookTipsAndMarketPriceUseCase {
  constructor(
    private readonly bitfinexService: BitfinexPublicApi,
    private readonly marketStatusService: MarketStatusService,
  ) {}

  async execute(data: {
    buyer: string;
    seller: string;
  }): Promise<OrderbookTipsAndMarketPrice> {
    const [ticker, orderbook] = await Promise.all([
      this.bitfinexService.ticker(data.buyer, data.seller),
      this.bitfinexService.orderbook(data.buyer, data.seller),
    ]);

    await this.marketStatusService.createMarketStatus(
      data.buyer as CRYPTO_CURRENCY,
      data.seller as CRYPTO_CURRENCY,
      ticker.lastPrice,
      ticker.volume,
      null,
    );

    return {
      bid: ticker.bid,
      ask: ticker.ask,
      marketPrice: ticker.lastPrice,
      orderbook: orderbook,
    };
  }
}

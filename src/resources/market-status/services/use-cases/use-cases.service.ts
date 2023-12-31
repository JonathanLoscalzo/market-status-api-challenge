import { Injectable } from '@nestjs/common';
import { GetOrderbookTipsAndMarketPriceUseCase } from './get-orderbook-tips-and-market-price/get-orderbook-tips-and-market-price.service';

@Injectable()
export class UseCasesService {
  /**
   * Following the clean architecture, this class gathers all use cases of the module.
   * It is responsible for the business logic of the module.
   */

  constructor(
    private readonly getOrderbookTipsAndMarketPriceUseCase: GetOrderbookTipsAndMarketPriceUseCase,
  ) {}

  async getOrderbookTipsAndMarketPrice(data: {
    buyer: string;
    seller: string;
  }) {
    return this.getOrderbookTipsAndMarketPriceUseCase.execute(data);
  }
}

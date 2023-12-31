import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderbookTipsAndMarketPriceUseCase } from './get-orderbook-tips-and-market-price.service';

describe('GetOrderbookTipsAndMarketPriceService', () => {
  let service: GetOrderbookTipsAndMarketPriceUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrderbookTipsAndMarketPriceUseCase],
    }).compile();

    service = module.get<GetOrderbookTipsAndMarketPriceUseCase>(
      GetOrderbookTipsAndMarketPriceUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

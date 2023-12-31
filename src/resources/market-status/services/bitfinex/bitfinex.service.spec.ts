import { Test, TestingModule } from '@nestjs/testing';
import { BitfinexPublicApi } from './bitfinex.service';

describe('BitfinexService', () => {
  let service: BitfinexPublicApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitfinexPublicApi],
    }).compile();

    service = module.get<BitfinexPublicApi>(BitfinexPublicApi);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

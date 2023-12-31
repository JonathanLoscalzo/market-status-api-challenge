import { Test, TestingModule } from '@nestjs/testing';
import { MarketStatusController } from './market-status.controller';

describe('TickersController', () => {
  let controller: MarketStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketStatusController],
    }).compile();

    controller = module.get<MarketStatusController>(MarketStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

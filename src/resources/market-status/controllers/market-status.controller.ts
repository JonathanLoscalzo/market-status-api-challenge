import { Body, NotImplementedException, Post } from '@nestjs/common';
import { ApiController } from 'src/core/decorators/api/controller.decorator';
import { TransactionPairDto } from '../dto/TransactionPair';
import { UseCasesService } from '../services/use-cases/use-cases.service';

@ApiController('market-status')
export class MarketStatusController {
  constructor(private readonly useCases: UseCasesService) {}

  @Post('/status')
  async getStatus(@Body() data: TransactionPairDto): Promise<any> {
    return this.useCases.getOrderbookTipsAndMarketPrice(data);
  }

  @Post('/historic-price')
  async getHistoricMarketPrice(@Body() data: TransactionPairDto): Promise<any> {
    throw new NotImplementedException(data);
  }
}

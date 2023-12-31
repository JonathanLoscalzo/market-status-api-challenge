import { Body, Post } from '@nestjs/common';
import { ApiController } from 'src/core/decorators/api/controller.decorator';
import { TransactionPairDto } from '../dto/TransactionPair';
import { UseCasesService } from '../services/use-cases/use-cases.service';

@ApiController('tickers')
export class TickersController {
  constructor(private readonly useCases: UseCasesService) {}

  @Post()
  async getTickers(@Body() data: TransactionPairDto): Promise<any> {
    return this.useCases.getOrderbookTipsAndMarketPrice(data);
  }
}

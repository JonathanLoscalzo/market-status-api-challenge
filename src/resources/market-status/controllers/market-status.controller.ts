import { Body, Get, Param, Post } from '@nestjs/common';
import { ApiController } from 'src/core/decorators/api/controller.decorator';
import { TransactionPairDto } from '../dto/TransactionPair';
import { UseCasesService } from '../services/use-cases/use-cases.service';
import { CRYPTO_CURRENCY } from 'src/core/enums/crypto-currency.enum';
import MarketStatusService from '../services/market-status.service';

@ApiController('market-status')
export class MarketStatusController {
  constructor(
    private readonly useCases: UseCasesService,
    private readonly marketStatusService: MarketStatusService,
  ) {}

  @Post('/status')
  async getStatus(@Body() data: TransactionPairDto): Promise<any> {
    return this.useCases.getOrderbookTipsAndMarketPrice(data);
  }

  @Get('/historic-price/:buyer/:seller')
  async getHistoricPrice(@Param() data: TransactionPairDto): Promise<any> {
    return this.marketStatusService.getAllSortedByDate(
      CRYPTO_CURRENCY[data.buyer],
      CRYPTO_CURRENCY[data.seller],
    );
  }
}

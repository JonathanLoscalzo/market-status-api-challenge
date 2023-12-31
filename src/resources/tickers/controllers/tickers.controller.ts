import { Body, Post } from '@nestjs/common';
import { ApiController } from 'src/core/decorators/api/controller.decorator';
import { BitfinexPublicApi } from '../services/bitfinex/bitfinex.service';
import { firstValueFrom } from 'rxjs';
import { Ticker } from 'src/core/entities/ticker.entity';
import { TransactionPairDto } from '../dto/TransactionPair';

@ApiController('tickers')
export class TickersController {
  constructor(private readonly bitfinexService: BitfinexPublicApi) {}

  @Post()
  async getTickers(@Body() data: TransactionPairDto): Promise<any> {
    const info = await firstValueFrom(
      this.bitfinexService.get(`v2/ticker/t${data.buyer}${data.seller}`),
    );

    const [
      bid,
      bidSize,
      ask,
      askSize,
      dailyChange,
      dailyChangeRelative,
      lastPrice,
      volume,
      high,
      low,
    ] = info.data;

    return new Ticker({
      bid,
      bidSize,
      ask,
      askSize,
      dailyChange,
      dailyChangeRelative,
      lastPrice,
      volume,
      high,
      low,
    });
  }
}

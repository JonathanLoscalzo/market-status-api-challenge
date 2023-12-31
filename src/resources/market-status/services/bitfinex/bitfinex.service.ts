import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OrderBookItem } from 'src/core/entities/order.entity';
import { Ticker } from 'src/core/entities/ticker.entity';
import { WebclientService } from 'src/core/services/webclient/webclient.service';

@Injectable()
export class BitfinexPublicApi extends WebclientService {
  constructor(private readonly service: HttpService) {
    super(
      'https://api-pub.bitfinex.com/',
      (error) => {
        throw new HttpException(
          error.response.data.join(' - '),
          error.response.status,
          {
            cause: error.response.data.join(' - '),
            description: error.message,
          },
        );
      },
      service,
    );
  }

  async ticker(buyer: string, seller: string): Promise<Ticker> {
    const res = await firstValueFrom(this.get(`v2/ticker/t${buyer}${seller}`));

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
    ] = res.data;

    return {
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
    } as Ticker;
  }

  async orderbook(buyer: string, seller: string): Promise<OrderBookItem[]> {
    const res = await firstValueFrom(this.get(`v2/book/t${buyer}${seller}/P0`));

    return res.data.map((item) => {
      const [price, count, amount] = item;
      return {
        price,
        count,
        amount: Math.abs(amount),
        type: amount > 0 ? 'bid' : 'ask',
      } as OrderBookItem;
    });
  }
}

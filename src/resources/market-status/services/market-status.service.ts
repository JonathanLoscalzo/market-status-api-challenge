import { BaseService } from 'src/infra/base/base.service';
import MarketStatus from '../entities/market-price.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CRYPTO_CURRENCY } from 'src/core/enums/crypto-currency.enum';

@Injectable()
export default class MarketStatusService extends BaseService<
  MarketStatus,
  string
> {
  constructor(
    @InjectRepository(MarketStatus)
    private repository: Repository<MarketStatus>,
  ) {
    super(repository);
  }

  async getAllSortedByDate(
    buyer: CRYPTO_CURRENCY,
    seller: CRYPTO_CURRENCY,
  ): Promise<MarketStatus[]> {
    // TODO: add pagination feature
    return await this.repository.find({
      where: {
        tradingPair: `${buyer}${seller}`,
      },
      order: {
        requestDate: 'DESC',
      },
    });
  }
}

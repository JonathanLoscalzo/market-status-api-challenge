import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WebclientService } from 'src/core/services/webclient/webclient.service';

@Injectable()
export class BitfinexPublicApi extends WebclientService {
  constructor(private readonly service: HttpService) {
    super('https://api-pub.bitfinex.com/', service);
  }
}

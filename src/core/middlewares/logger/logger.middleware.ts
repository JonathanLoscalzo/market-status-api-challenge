import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { inspect } from 'util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  use(req: any, res: any, next: () => void) {
    const { httpAdapter } = this.httpAdapterHost;
    // TODO: add delay time and check request id
    this.logger.debug(
      `Request -> ${req.method} ${httpAdapter.getRequestUrl(req)} - ${inspect(
        req.body,
      )}`,
    );

    next();

    this.logger.debug(
      `Response -> ${req.method} ${httpAdapter.getRequestUrl(req)} -  (${
        res.statusCode
      })`,
    );
  }
}

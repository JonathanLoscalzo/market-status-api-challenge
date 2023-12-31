import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Observable, catchError, tap } from 'rxjs';
import { inspect } from 'util';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { httpAdapter } = this.httpAdapterHost;
    const req = context.switchToHttp().getRequest();

    // TODO: add delay time and check request id
    this.logger.debug(
      `Request -> ${req.method} ${httpAdapter.getRequestUrl(req)} - ${inspect(
        req.body,
      )}`,
    );

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        this.logger.debug(
          `Response -> ${req.method} ${httpAdapter.getRequestUrl(req)} -  (${
            res.statusCode
          })`,
        );
      }),
      catchError((err) => {
        const res = context.switchToHttp().getResponse();
        this.logger.error(err);
        this.logger.error(
          `Response -> ${req.method} ${httpAdapter.getRequestUrl(req)} -  (${
            res.statusCode
          })`,
        );

        throw err;
      }),
    );
  }
}

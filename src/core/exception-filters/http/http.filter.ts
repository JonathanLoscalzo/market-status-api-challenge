import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { inspect } from 'util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { httpAdapter } = this.httpAdapterHost;
    if (req.url == '/health') {
      return response.status(status).json((exception as any).response?.details);
    }

    this.logger.error(exception);
    this.logger.error(
      `Response from: ${req.method} - ${httpAdapter.getRequestUrl(
        ctx.getRequest(),
      )} - ${inspect(req.body)}`,
    );

    response.status(status).json({
      message: {
        statusCode: status,
        error: 'Bad Request',
        timestamp: new Date().toISOString(),
        description: exception.message,
        path: req.url,
      },
    });
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { inspect } from 'util';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('ErrorFilter');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { httpAdapter } = this.httpAdapterHost;

    this.logger.error(exception);
    this.logger.error(
      `Response from: ${req.method} - ${httpAdapter.getRequestUrl(
        ctx.getRequest(),
      )} - ${inspect(req.body)}`,
    );

    return response.status(400).json({
      message: {
        statusCode: 400,
        error: 'Bad Request',
        description: exception.message,
      },
    });
  }
}

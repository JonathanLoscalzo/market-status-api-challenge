import { applyDecorators, Controller, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/core/interceptors/logger/logger.interceptor';

export function ApiController(
  prefix: string,
  // (...roles: Role[]
) {
  return applyDecorators(
    Controller(prefix),
    ApiTags(prefix),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
    UseInterceptors(LoggerInterceptor),
  );
}

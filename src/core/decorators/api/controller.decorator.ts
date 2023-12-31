import { applyDecorators, Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiController(
  prefix: string,
  // (...roles: Role[]
) {
  return applyDecorators(
    Controller(prefix),
    ApiTags(prefix),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}

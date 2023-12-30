import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from 'src/core/exceptions/validation.exception';
import { Response } from 'express';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  public catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(404).json({
      message: {
        statusCode: 404,
        error: 'Ocurrieron errores de validación en el formulario',
        validations: exception.errors,
        description: exception.message,
      },
    });
  }
}

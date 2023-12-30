import { BadRequestException, ValidationError } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super({ errors }, 'Ocurrieron errores de validación en el formulario');

    // omit target
    this.errors = errors.map((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { target, ...e } = error;

      return e;
    });
  }
}

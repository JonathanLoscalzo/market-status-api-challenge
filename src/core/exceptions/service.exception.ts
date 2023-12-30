import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(message = 'Service Exception') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

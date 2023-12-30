import { ValidationExceptionFilter } from './validation.filter';

describe('ValidationFilter', () => {
  it('should be defined', () => {
    expect(new ValidationExceptionFilter()).toBeDefined();
  });
});

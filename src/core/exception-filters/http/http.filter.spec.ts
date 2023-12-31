import { HttpExceptionFilter } from './http.filter';

describe('HttpFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter(null)).toBeDefined();
  });
});

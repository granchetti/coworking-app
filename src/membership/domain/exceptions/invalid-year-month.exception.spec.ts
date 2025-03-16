import { InvalidYearMonthException } from './invalid-year-month.exception';

describe('InvalidYearMonthException', () => {
  it('should have the correct message and name', () => {
    const exception = new InvalidYearMonthException();
    expect(exception.message).toBe('Invalid year or month');
    expect(exception.name).toBe('InvalidYearMonthException');
  });
});

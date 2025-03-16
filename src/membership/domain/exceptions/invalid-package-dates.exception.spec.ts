import { InvalidPackageDatesException } from './invalid-package-dates.exception';

describe('InvalidPackageDatesException', () => {
  it('should have the correct message and name', () => {
    const exception = new InvalidPackageDatesException();
    expect(exception.message).toBe('The end date must be after the start date');
    expect(exception.name).toBe('InvalidPackageDatesException');
  });
});

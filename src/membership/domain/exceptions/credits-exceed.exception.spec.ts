import { CreditsExceedException } from './credits-exceed.exception';

describe('CreditsExceedException', () => {
  it('should have the correct message and name', () => {
    const maxDays = 31;
    const exception = new CreditsExceedException(maxDays);
    expect(exception.message).toBe(
      `Credits exceed maximum days in the month (${maxDays})`,
    );
    expect(exception.name).toBe('CreditsExceedException');
  });
});

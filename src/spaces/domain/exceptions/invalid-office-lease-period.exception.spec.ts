import { InvalidOfficeLeasePeriodException } from './invalid-office-lease-period.exception';

describe('InvalidOfficeLeasePeriodException', () => {
  it('should have the correct message and name', () => {
    const error = new InvalidOfficeLeasePeriodException();
    expect(error.message).toBe(
      'Invalid office lease period. The minimum lease period is 12 months.',
    );
    expect(error.name).toBe('InvalidOfficeLeasePeriodException');
  });
});

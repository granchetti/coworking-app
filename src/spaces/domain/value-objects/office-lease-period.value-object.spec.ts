import { InvalidOfficeLeasePeriodException } from '../exceptions/invalid-office-lease-period.exception';
import { OfficeLeasePeriod } from './office-lease-period.value-object';

describe('OfficeLeasePeriod Value Object', () => {
  it('should create a valid OfficeLeasePeriod if value is 12 or more', () => {
    const leasePeriod = new OfficeLeasePeriod(12);
    expect(leasePeriod.getValue()).toBe(12);
    const leasePeriod2 = new OfficeLeasePeriod(24);
    expect(leasePeriod2.getValue()).toBe(24);
  });

  it('should throw InvalidOfficeLeasePeriodException if value is less than 12', () => {
    expect(() => new OfficeLeasePeriod(6)).toThrow(
      InvalidOfficeLeasePeriodException,
    );
  });

  it('should throw InvalidOfficeLeasePeriodException if value is not an integer', () => {
    expect(() => new OfficeLeasePeriod(12.5)).toThrow(
      InvalidOfficeLeasePeriodException,
    );
  });
});

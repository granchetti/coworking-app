import { Package } from './package.entity';
import { InvalidPackageDatesException } from '../exceptions/invalid-package-dates.exception';
import { StartDateInPastException } from '../exceptions/start-date-in-past.exception';
import { InvalidCreditsException } from '../exceptions/invalid-credits.exception';
import { CreditsExceedException } from '../exceptions/credits-exceed.exception';

describe('Package Entity', () => {
  const validStartDate = new Date(2050, 4, 1);
  const validEndDate = new Date(2050, 4, 30);
  const maxDays = new Date(
    validStartDate.getFullYear(),
    validStartDate.getMonth() + 1,
    0,
  ).getDate();

  it('should create a package with valid data', () => {
    const pkg = Package.create(30, validStartDate, validEndDate);
    expect(pkg).toBeDefined();
    expect(pkg.id.getValue()).toBeDefined();
    expect(pkg.credits.getValue()).toBe(30);
    expect(pkg.startDate.getValue()).toEqual(validStartDate);
    expect(pkg.endDate.getValue()).toEqual(validEndDate);
  });

  it('should throw error for invalid credits (zero)', () => {
    expect(() => Package.create(0, validStartDate, validEndDate)).toThrow(
      InvalidCreditsException,
    );
  });

  it('should throw error if credits exceed maximum days in month', () => {
    expect(() =>
      Package.create(maxDays + 1, validStartDate, validEndDate),
    ).toThrow(new CreditsExceedException(maxDays));
  });

  it('should throw error for invalid start date', () => {
    expect(() =>
      Package.create(100, new Date('invalid-date'), validEndDate),
    ).toThrow('Invalid date');
  });

  it('should throw error for invalid end date', () => {
    expect(() =>
      Package.create(100, validStartDate, new Date('invalid-date')),
    ).toThrow('Invalid date');
  });

  it('should throw error if end date is not after start date', () => {
    const sameDate = new Date(2050, 3, 1);
    expect(() => Package.create(31, validStartDate, sameDate)).toThrow(
      new InvalidPackageDatesException(),
    );
  });

  it('should throw error if start date is in the past and not the first day of the month', () => {
    const pastDate = new Date(new Date().getFullYear() - 1, 5, 15);
    const futureDate = new Date(new Date().getFullYear() + 1, 0, 1);
    expect(() => Package.create(31, pastDate, futureDate)).toThrow(
      StartDateInPastException,
    );
  });
});

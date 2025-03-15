import { InvalidCreditsException } from '../exceptions/invalid-credits.exception';
import { InvalidPackageDatesException } from '../exceptions/invalid-package-dates.exception';
import { StartDateInPastException } from '../exceptions/start-date-in-past.exception';
import { Package } from './package.entity';

describe('Package Entity', () => {
  const validStartDate = new Date(2030, 3, 1);
  const validEndDate = new Date(2030, 3, 31);

  it('should create a package with valid data', () => {
    const pkg = Package.create(100, validStartDate, validEndDate);
    expect(pkg).toBeDefined();
    expect(pkg.id.getValue()).toBeDefined();
    expect(pkg.credits.getValue()).toBe(100);
    expect(pkg.startDate.getValue()).toEqual(validStartDate);
    expect(pkg.endDate.getValue()).toEqual(validEndDate);
  });

  it('should throw error for invalid credits', () => {
    expect(() => Package.create(0, validStartDate, validEndDate)).toThrow(
      InvalidCreditsException,
    );
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
    const sameDate = new Date(2025, 2, 1);
    expect(() => Package.create(100, validStartDate, sameDate)).toThrow(
      InvalidPackageDatesException,
    );
  });

  it('should throw error if start date is in the past', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const futureDate = new Date(new Date().getFullYear() + 1, 0, 1);
    expect(() => Package.create(100, pastDate, futureDate)).toThrow(
      StartDateInPastException,
    );
  });
});

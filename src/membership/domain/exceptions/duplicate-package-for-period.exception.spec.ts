import { DuplicatePackageForPeriodException } from './duplicate-package-for-period.exception';

describe('DuplicatePackageForPeriodException', () => {
  it('should have the correct message and name', () => {
    const exception = new DuplicatePackageForPeriodException();
    expect(exception.message).toBe('A package for this period already exists');
    expect(exception.name).toBe('DuplicatePackageForPeriodException');
  });
});

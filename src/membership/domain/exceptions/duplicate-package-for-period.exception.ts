export class DuplicatePackageForPeriodException extends Error {
  constructor() {
    super('A package for this period already exists');
    this.name = 'DuplicatePackageForPeriodException';
  }
}

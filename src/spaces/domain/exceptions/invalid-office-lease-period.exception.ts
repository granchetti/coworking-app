export class InvalidOfficeLeasePeriodException extends Error {
  constructor() {
    super(
      'Invalid office lease period. The minimum lease period is 12 months.',
    );
    this.name = 'InvalidOfficeLeasePeriodException';
  }
}

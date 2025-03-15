export class InvalidPackageDatesException extends Error {
  constructor() {
    super('The end date must be after the start date');
    this.name = 'InvalidPackageDatesException';
  }
}

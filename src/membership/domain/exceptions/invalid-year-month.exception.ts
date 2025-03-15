export class InvalidYearMonthException extends Error {
  constructor() {
    super('Invalid year or month');
    this.name = 'InvalidYearMonthException';
  }
}

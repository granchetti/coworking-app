export class StartDateInPastException extends Error {
  constructor() {
    super('The start date cannot be in the past');
    this.name = 'StartDateInPastException';
  }
}

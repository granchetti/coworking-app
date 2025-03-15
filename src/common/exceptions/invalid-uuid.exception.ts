export class InvalidUuidException extends Error {
  constructor() {
    super('Invalid UUID');
    this.name = 'InvalidUuidException';
  }
}

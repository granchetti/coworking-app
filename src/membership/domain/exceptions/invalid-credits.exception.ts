export class InvalidCreditsException extends Error {
  constructor() {
    super('Invalid credits');
    this.name = 'InvalidCreditsException';
  }
}

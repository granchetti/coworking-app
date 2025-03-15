export class CreditsExceedException extends Error {
  constructor(maxDays: number) {
    super(`Credits exceed maximum days in the month (${maxDays})`);
    this.name = 'CreditsExceedException';
  }
}

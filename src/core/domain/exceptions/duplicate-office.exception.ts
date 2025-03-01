export class DuplicateOfficeException extends Error {
  constructor() {
    super('Duplicate Office');
    this.name = 'DuplicateOfficeException';
  }
}

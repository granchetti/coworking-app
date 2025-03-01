export class DuplicateHotDeskException extends Error {
  constructor() {
    super('Duplicate HotDesk');
    this.name = 'DuplicateHotDeskException';
  }
}

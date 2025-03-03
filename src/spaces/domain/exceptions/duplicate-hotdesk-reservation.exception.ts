export class DuplicateHotDeskReservationException extends Error {
  constructor() {
    super('User already has a hotdesk reservation for the specified date');
    this.name = 'DuplicateHotDeskReservationException';
  }
}

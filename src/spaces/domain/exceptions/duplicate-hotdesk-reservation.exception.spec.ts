import { DuplicateHotDeskReservationException } from './duplicate-hotdesk-reservation.exception';

describe('DuplicateHotDeskReservationException', () => {
  it('should have the correct message and name', () => {
    const error = new DuplicateHotDeskReservationException();
    expect(error.message).toBe(
      'User already has a hotdesk reservation for the specified date',
    );
    expect(error.name).toBe('DuplicateHotDeskReservationException');
  });
});

import { ReservationDuration } from './reservation-duration.value-object';

describe('ReservationDuration Value Object', () => {
  it('should create a valid ReservationDuration', () => {
    const duration = new ReservationDuration(3);
    expect(duration.getValue()).toBe(3);
  });

  it('should throw error for a duration less than 1', () => {
    expect(() => new ReservationDuration(0)).toThrow(
      'Invalid reservation duration. Expected an integer between 1 and 12.',
    );
  });

  it('should throw error for a duration greater than 12', () => {
    expect(() => new ReservationDuration(13)).toThrow(
      'Invalid reservation duration. Expected an integer between 1 and 12.',
    );
  });
});

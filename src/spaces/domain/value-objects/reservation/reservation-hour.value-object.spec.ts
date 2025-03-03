import { ReservationHour } from './reservation-hour.value-object';

describe('ReservationHour Value Object', () => {
  it('should create a valid ReservationHour', () => {
    const hour = new ReservationHour(15);
    expect(hour.getValue()).toBe(15);
  });

  it('should throw error for a negative hour', () => {
    expect(() => new ReservationHour(-1)).toThrow(
      'Invalid reservation hour. Expected an integer between 0 and 23.',
    );
  });

  it('should throw error for an hour greater than 23', () => {
    expect(() => new ReservationHour(24)).toThrow(
      'Invalid reservation hour. Expected an integer between 0 and 23.',
    );
  });
});

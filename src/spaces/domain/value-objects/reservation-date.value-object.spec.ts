import { ReservationDate } from './reservation-date.value-object';

describe('ReservationDate Value Object', () => {
  it('should create a valid ReservationDate with correct format', () => {
    const date = new ReservationDate('2099-12-31');
    expect(date.getValue()).toBe('2099-12-31');
  });

  it('should throw error for invalid date format', () => {
    expect(() => new ReservationDate('12/31/2099')).toThrow(
      'Invalid date format. Expected YYYY-MM-DD',
    );
  });

  it('should throw error for an invalid date', () => {
    expect(() => new ReservationDate('2099-02-30')).toThrow('Invalid date');
  });
});

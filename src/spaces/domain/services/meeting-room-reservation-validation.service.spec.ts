import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { ReservationDuration } from '../value-objects/reservation-duration.value-object';
import { ReservationHour } from '../value-objects/reservation-hour.value-object';
import { MeetingRoomReservationValidationService } from './meeting-room-reservation-validation.service';

describe('MeetingRoomReservationValidationService', () => {
  const service = new MeetingRoomReservationValidationService();

  it('should pass validation for a future reservation date', () => {
    const date = new ReservationDate('2099-12-31');
    const hour = new ReservationHour(10);
    expect(() => service.validateForToday(date, hour)).not.toThrow();
  });

  it('should throw error if reservation for today is at or before current hour', () => {
    const today = new Date().toISOString().slice(0, 10);
    const date = new ReservationDate(today);
    const currentHour = new Date().getHours();
    const hour = new ReservationHour(currentHour);
    expect(() => service.validateForToday(date, hour)).toThrow(
      'For reservations on the current day, the hour must be at least the next hour',
    );
  });

  it('should throw error for overlapping reservations', () => {
    const existingReservations = [
      { hour: 10, duration: 2, status: { getValue: () => 'Active' } },
    ];
    const newHour = new ReservationHour(11);
    const newDuration = new ReservationDuration(2);
    expect(() =>
      service.validateOverlapping(existingReservations, newHour, newDuration),
    ).toThrow('Time slot already reserved');
  });
});

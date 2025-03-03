import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { ReservationDuration } from '../value-objects/reservation-duration.value-object';
import { ReservationHour } from '../value-objects/reservation-hour.value-object';

export class MeetingRoomReservationValidationService {
  public validateForToday(date: ReservationDate, hour: ReservationHour): void {
    const today = new Date().toISOString().slice(0, 10);
    if (date.getValue() === today) {
      const currentHour = new Date().getHours();
      if (hour.getValue() <= currentHour) {
        throw new Error(
          'For reservations on the current day, the hour must be at least the next hour',
        );
      }
    }
  }

  public validateOverlapping(
    existingReservations: {
      hour: number;
      duration: number;
      status: { getValue(): string };
    }[],
    hour: ReservationHour,
    duration: ReservationDuration,
  ): void {
    for (const res of existingReservations) {
      if (
        res.status.getValue() === 'Active' &&
        this.isOverlapping(
          hour.getValue(),
          duration.getValue(),
          res.hour,
          res.duration,
        )
      ) {
        throw new Error('Time slot already reserved');
      }
    }
  }

  private isOverlapping(
    start1: number,
    duration1: number,
    start2: number,
    duration2: number,
  ): boolean {
    const end1 = start1 + duration1;
    const end2 = start2 + duration2;
    return start1 < end2 && start2 < end1;
  }
}

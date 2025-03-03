import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { ReservationDuration } from '../value-objects/reservation-duration.value-object';
import { ReservationHour } from '../value-objects/reservation-hour.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { MeetingRoomReservation } from './meeting-room-reservation.entity';

describe('MeetingRoomReservation Entity', () => {
  it('should create a valid MeetingRoomReservation', () => {
    const userId = new Uuid();
    const meetingRoomId = new Uuid();
    const date = new ReservationDate('2099-12-31');
    const hour = new ReservationHour(10);
    const duration = new ReservationDuration(2);

    const reservation = MeetingRoomReservation.create(
      userId,
      date,
      meetingRoomId,
      hour,
      duration,
    );
    expect(reservation.id.getValue()).toBeDefined();
    expect(reservation.userId.getValue()).toBe(userId.getValue());
    expect(reservation.date.getValue()).toBe(date.getValue());
    expect(reservation.meetingRoomId.getValue()).toBe(meetingRoomId.getValue());
    expect(reservation.hour.getValue()).toBe(10);
    expect(reservation.duration.getValue()).toBe(2);
    expect(reservation.status.getValue()).toBe('Active');
  });

  it('should allow assigning a complimentary hot desk', () => {
    const userId = new Uuid();
    const meetingRoomId = new Uuid();
    const date = new ReservationDate('2099-12-31');
    const hour = new ReservationHour(10);
    const duration = new ReservationDuration(2);
    const reservation = MeetingRoomReservation.create(
      userId,
      date,
      meetingRoomId,
      hour,
      duration,
    );

    const hotDeskId = new Uuid();
    reservation.assignComplimentaryHotDesk(hotDeskId);
    expect(reservation.complimentaryHotDeskId?.getValue()).toBe(
      hotDeskId.getValue(),
    );
  });
});

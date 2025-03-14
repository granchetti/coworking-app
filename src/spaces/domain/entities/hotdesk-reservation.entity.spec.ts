import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { HotDeskReservation } from './hotdesk-reservation.entity';

describe('HotDeskReservation Entity', () => {
  it('should create a valid HotDeskReservation', () => {
    const userId = new Uuid();
    const date = new ReservationDate('2099-12-31');
    const includedInMembership = true;

    const reservation = HotDeskReservation.create(
      userId,
      date,
      includedInMembership,
    );
    expect(reservation.id.getValue()).toBeDefined();
    expect(reservation.userId.getValue()).toBe(userId.getValue());
    expect(reservation.date.getValue()).toBe(date.getValue());
    expect(reservation.status.getValue()).toBe('Active');
    expect(reservation.includedInMembership).toBe(true);
  });
});

import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { Status } from '../value-objects/shared/status.value-object';
import { Reservation } from './reservation.entity';

export class HotDeskReservation extends Reservation {
  private readonly _includedInMembership: boolean;

  private constructor(
    userId: Uuid,
    date: ReservationDate,
    status: Status,
    includedInMembership: boolean,
  ) {
    super(userId, date, status);
    this._includedInMembership = includedInMembership;
  }

  public static create(
    userId: Uuid,
    date: ReservationDate,
    includedInMembership: boolean,
  ): HotDeskReservation {
    const status = Status.active();
    return new HotDeskReservation(userId, date, status, includedInMembership);
  }

  public get includedInMembership(): boolean {
    return this._includedInMembership;
  }
}

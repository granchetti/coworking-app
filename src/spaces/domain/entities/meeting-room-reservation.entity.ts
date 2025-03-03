import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';
import { ReservationDuration } from '../value-objects/reservation/reservation-duration.value-object';
import { ReservationHour } from '../value-objects/reservation/reservation-hour.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { Status } from '../value-objects/shared/status.value-object';
import { Timestamp } from '../value-objects/shared/timestamp.value-object';
import { Reservation } from './reservation.entity';

export class MeetingRoomReservation extends Reservation {
  private readonly _meetingRoomId: Uuid;
  private readonly _hour: ReservationHour;
  private readonly _duration: ReservationDuration;
  private _complimentaryHotDeskId?: Uuid;

  private constructor(
    userId: Uuid,
    date: ReservationDate,
    meetingRoomId: Uuid,
    hour: ReservationHour,
    duration: ReservationDuration,
    status: Status,
  ) {
    super(userId, date, status);
    this._meetingRoomId = meetingRoomId;
    this._hour = hour;
    this._duration = duration;
  }

  public static create(
    userId: Uuid,
    date: ReservationDate,
    meetingRoomId: Uuid,
    hour: ReservationHour,
    duration: ReservationDuration,
  ): MeetingRoomReservation {
    const reservationHour = new ReservationHour(hour.getValue());
    const reservationDuration = new ReservationDuration(duration.getValue());
    const status = Status.active();
    return new MeetingRoomReservation(
      userId,
      date,
      meetingRoomId,
      reservationHour,
      reservationDuration,
      status,
    );
  }

  public get meetingRoomId(): Uuid {
    return this._meetingRoomId;
  }
  public get hour(): ReservationHour {
    return this._hour;
  }
  public get duration(): ReservationDuration {
    return this._duration;
  }
  public get complimentaryHotDeskId(): Uuid | undefined {
    return this._complimentaryHotDeskId;
  }

  public assignComplimentaryHotDesk(hotDeskId: Uuid): void {
    this._complimentaryHotDeskId = hotDeskId;
    this._updatedAt = new Timestamp();
  }
}

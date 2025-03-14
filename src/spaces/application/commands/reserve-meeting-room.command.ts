import { Uuid } from 'src/common/value-objects/entity-id.value-object';
import { ReservationDate } from 'src/spaces/domain/value-objects/reservation-date.value-object';
import { ReservationDuration } from 'src/spaces/domain/value-objects/reservation-duration.value-object';
import { ReservationHour } from 'src/spaces/domain/value-objects/reservation-hour.value-object';

export class ReserveMeetingRoomCommand {
  constructor(
    public readonly meetingRoomId: Uuid,
    public readonly date: ReservationDate,
    public readonly hour: ReservationHour,
    public readonly duration: ReservationDuration,
    public readonly userId: Uuid,
  ) {}
}

import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { ReservationDate } from '../value-objects/reservation-date.value-object';

export class MeetingRoomReservedEvent {
  constructor(
    public readonly userId: Uuid,
    public readonly meetingRoomId: Uuid,
    public readonly date: ReservationDate,
    public readonly occurredOn: Date = new Date(),
  ) {}
}

import { Uuid } from '../../domain/value_objects/shared/entity-id.value-object';
import { Timestamp } from '../../domain/value_objects/shared/timestamp.value-object';
import { Status } from '../value_objects/shared/status.value-object';
import { MeetingRoomName } from '../value_objects/meeting-room/meeting-room-name.value-object';
import { MeetingRoomCapacity } from '../value_objects/meeting-room/meeting-room-capacity.value-object';

export class MeetingRoom {
  public readonly id: Uuid;
  public readonly name: MeetingRoomName;
  public readonly capacity: MeetingRoomCapacity;
  public status: Status;
  public readonly createdAt: Timestamp;
  public updatedAt: Timestamp;

  private constructor(name: MeetingRoomName, capacity: MeetingRoomCapacity) {
    this.id = new Uuid();
    this.name = name;
    this.capacity = capacity;
    this.status = Status.active();
    this.createdAt = new Timestamp();
    this.updatedAt = new Timestamp();
  }

  public static create(name: string, capacity: number): MeetingRoom {
    const meetingRoomName = new MeetingRoomName(name);
    const meetingRoomCapacity = new MeetingRoomCapacity(capacity);
    return new MeetingRoom(meetingRoomName, meetingRoomCapacity);
  }
}

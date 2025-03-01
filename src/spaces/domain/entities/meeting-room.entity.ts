import { Uuid } from '../value_objects/shared/entity-id.value-object';
import { Timestamp } from '../value_objects/shared/timestamp.value-object';
import { Status } from '../value_objects/shared/status.value-object';
import { MeetingRoomName } from '../value_objects/meeting-room/meeting-room-name.value-object';
import { MeetingRoomCapacity } from '../value_objects/meeting-room/meeting-room-capacity.value-object';

export class MeetingRoom {
  private readonly _id: Uuid;
  private readonly _name: MeetingRoomName;
  private readonly _capacity: MeetingRoomCapacity;
  private _status: Status;
  private readonly _createdAt: Timestamp;
  private _updatedAt: Timestamp;

  private constructor(name: MeetingRoomName, capacity: MeetingRoomCapacity) {
    this._id = new Uuid();
    this._name = name;
    this._capacity = capacity;
    this._status = Status.active();
    this._createdAt = new Timestamp();
    this._updatedAt = new Timestamp();
  }

  public static create(name: string, capacity: number): MeetingRoom {
    const meetingRoomName = new MeetingRoomName(name);
    const meetingRoomCapacity = new MeetingRoomCapacity(capacity);
    return new MeetingRoom(meetingRoomName, meetingRoomCapacity);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get name(): MeetingRoomName {
    return this._name;
  }

  public get capacity(): MeetingRoomCapacity {
    return this._capacity;
  }

  public get status(): Status {
    return this._status;
  }

  public get createdAt(): Timestamp {
    return this._createdAt;
  }

  public get updatedAt(): Timestamp {
    return this._updatedAt;
  }

  public updateStatus(newStatus: Status): void {
    this._status = newStatus;
    this._updatedAt = new Timestamp();
  }
}

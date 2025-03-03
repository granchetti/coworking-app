import { MeetingRoom } from '../entities/meeting-room.entity';
import { MeetingRoomName } from '../value-objects/meeting-room-name.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';

export interface IMeetingRoomRepository {
  findById(id: Uuid): Promise<MeetingRoom | null>;
  findByName(name: MeetingRoomName): Promise<MeetingRoom | null>;
  save(meetingRoom: MeetingRoom): Promise<void>;
}

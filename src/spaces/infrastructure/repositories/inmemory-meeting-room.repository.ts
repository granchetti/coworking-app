import { MeetingRoomName } from '../../domain/value-objects/meeting-room-name.value-object';
import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { IMeetingRoomRepository } from '../../domain/repositories/meeting-room.repository.interface';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class InMemoryMeetingRoomRepository implements IMeetingRoomRepository {
  private meetingRooms: MeetingRoom[] = [];

  async findById(id: Uuid): Promise<MeetingRoom | null> {
    return (
      this.meetingRooms.find((mr) => mr.id.getValue() === id.getValue()) || null
    );
  }

  async findByName(name: MeetingRoomName): Promise<MeetingRoom | null> {
    return this.meetingRooms.find((mr) => mr.name.equals(name)) || null;
  }

  async getAll(): Promise<MeetingRoom[]> {
    return this.meetingRooms;
  }

  async save(meetingRoom: MeetingRoom): Promise<void> {
    this.meetingRooms.push(meetingRoom);
  }
}

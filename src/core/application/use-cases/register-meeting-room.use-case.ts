import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';
import { IMeetingRoomRepository } from '../../domain/repositories/meeting-room.repository.interface';
import { MeetingRoomName } from '../../domain/value_objects/meeting-room/meeting-room-name.value-object';

export class RegisterMeetingRoomUseCase {
  constructor(private meetingRoomRepository: IMeetingRoomRepository) {}

  public async execute(input: {
    name: string;
    capacity: number;
  }): Promise<MeetingRoom> {
    const meetingRoomName = new MeetingRoomName(input.name);

    if (!Number.isInteger(input.capacity) || input.capacity <= 0) {
      throw new Error('Invalid meeting room capacity');
    }

    const existing =
      await this.meetingRoomRepository.findByName(meetingRoomName);
    if (existing) {
      throw new DuplicateMeetingRoomException();
    }

    const meetingRoom = MeetingRoom.create(input.name, input.capacity);
    await this.meetingRoomRepository.save(meetingRoom);
    return meetingRoom;
  }
}

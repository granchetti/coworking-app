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
    // The MeetingRoomName value object will validate that name is not empty.
    const meetingRoomName = new MeetingRoomName(input.name);

    // Validate capacity (this could also be encapsulated in a MeetingRoomCapacity value object if desired)
    if (!Number.isInteger(input.capacity) || input.capacity <= 0) {
      throw new Error('Invalid meeting room capacity');
    }

    // Check for duplicates using the repository
    const existing =
      await this.meetingRoomRepository.findByName(meetingRoomName);
    if (existing) {
      throw new DuplicateMeetingRoomException();
    }

    // Create the MeetingRoom entity (which internally creates the necessary value objects)
    const meetingRoom = MeetingRoom.create(input.name, input.capacity);
    await this.meetingRoomRepository.save(meetingRoom);
    return meetingRoom;
  }
}

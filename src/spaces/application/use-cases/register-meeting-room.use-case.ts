import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';
import { IMeetingRoomRepository } from '../../domain/repositories/meeting-room.repository.interface';
import { MeetingRoomName } from '../../domain/value-objects/meeting-room-name.value-object';
import { RegisterMeetingRoomCommand } from '../commands/register-meeting-room.command';

export class RegisterMeetingRoomUseCase {
  constructor(private meetingRoomRepository: IMeetingRoomRepository) {}

  public async execute(
    command: RegisterMeetingRoomCommand,
  ): Promise<MeetingRoom> {
    const { name, capacity } = command;
    const meetingRoomName = new MeetingRoomName(name);

    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('Invalid meeting room capacity');
    }

    const existing =
      await this.meetingRoomRepository.findByName(meetingRoomName);
    if (existing) {
      throw new DuplicateMeetingRoomException();
    }

    const meetingRoom = MeetingRoom.create(name, capacity);
    await this.meetingRoomRepository.save(meetingRoom);
    return meetingRoom;
  }
}

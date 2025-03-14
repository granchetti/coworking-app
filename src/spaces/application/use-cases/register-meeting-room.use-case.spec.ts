import { RegisterMeetingRoomUseCase } from './register-meeting-room.use-case';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { RegisterMeetingRoomCommand } from '../commands/register-meeting-room.command';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';

describe('RegisterMeetingRoomUseCase', () => {
  let repository: InMemoryMeetingRoomRepository;
  let useCase: RegisterMeetingRoomUseCase;

  beforeEach(() => {
    repository = new InMemoryMeetingRoomRepository();
    useCase = new RegisterMeetingRoomUseCase(repository);
  });

  it('should register a MeetingRoom with a valid name and capacity', async () => {
    const command = new RegisterMeetingRoomCommand('Meeting Room 1', 20);
    const result = await useCase.execute(command);
    expect(result.name.getValue()).toBe('Meeting Room 1');
    expect(result.capacity.getValue()).toBe(20);
  });

  it('should throw a duplicate error when registering a MeetingRoom with the same name', async () => {
    const command = new RegisterMeetingRoomCommand('Meeting Room 2', 30);
    await useCase.execute(command);
    await expect(useCase.execute(command)).rejects.toThrow(
      DuplicateMeetingRoomException,
    );
  });

  it('should throw an error for invalid name or capacity', async () => {
    await expect(
      useCase.execute(new RegisterMeetingRoomCommand('', 10)),
    ).rejects.toThrow();
    await expect(
      useCase.execute(new RegisterMeetingRoomCommand('Room X', 0)),
    ).rejects.toThrow();
  });
});

import { RegisterMeetingRoomUseCase } from './register-meeting-room.use-case';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';

describe('RegisterMeetingRoomUseCase', () => {
  let repository: InMemoryMeetingRoomRepository;
  let useCase: RegisterMeetingRoomUseCase;

  beforeEach(() => {
    repository = new InMemoryMeetingRoomRepository();
    useCase = new RegisterMeetingRoomUseCase(repository);
  });

  it('should register a MeetingRoom with a valid name and capacity', async () => {
    const result = await useCase.execute({
      name: 'Meeting Room 1',
      capacity: 20,
    });
    expect(result.name.getValue()).toBe('Meeting Room 1');
    expect(result.capacity.getValue()).toBe(20);
  });

  it('should throw a duplicate error when registering a MeetingRoom with the same name', async () => {
    await useCase.execute({ name: 'Meeting Room 2', capacity: 30 });
    await expect(
      useCase.execute({ name: 'Meeting Room 2', capacity: 30 }),
    ).rejects.toThrow(DuplicateMeetingRoomException);
  });

  it('should throw an error for invalid name or capacity', async () => {
    await expect(useCase.execute({ name: '', capacity: 10 })).rejects.toThrow();
    await expect(
      useCase.execute({ name: 'Room X', capacity: 0 }),
    ).rejects.toThrow();
  });
});

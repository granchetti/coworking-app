import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { MeetingRoomName } from '../../domain/value_objects/meeting-room/meeting-room-name.value-object';

describe('InMemoryMeetingRoomRepository', () => {
  let repository: InMemoryMeetingRoomRepository;

  beforeEach(() => {
    repository = new InMemoryMeetingRoomRepository();
  });

  it('should save and find a MeetingRoom by name', async () => {
    const meetingRoom = MeetingRoom.create('Room A', 10);
    await repository.save(meetingRoom);
    const found = await repository.findByName(new MeetingRoomName('Room A'));
    expect(found).toBeDefined();
    expect(found?.name.getValue()).toBe('Room A');
  });

  it('should return null if no MeetingRoom is found by name', async () => {
    const found = await repository.findByName(
      new MeetingRoomName('Nonexistent Room'),
    );
    expect(found).toBeNull();
  });

  it('should save and find a MeetingRoom by id', async () => {
    const meetingRoom = MeetingRoom.create('Room B', 15);
    await repository.save(meetingRoom);
    const found = await repository.findById(meetingRoom.id);
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(meetingRoom.id.getValue());
  });
});

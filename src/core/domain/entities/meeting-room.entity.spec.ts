import { MeetingRoom } from '../../domain/entities/meeting-room.entity';

describe('MeetingRoom Entity', () => {
  it('should create a valid MeetingRoom', () => {
    const meetingRoom = MeetingRoom.create('Conference Room', 20);
    expect(meetingRoom).toBeDefined();
    expect(meetingRoom.id.getValue()).toBeDefined();
    expect(meetingRoom.name.getValue()).toBe('Conference Room');
    expect(meetingRoom.capacity.getValue()).toBe(20);
    expect(meetingRoom.status.getValue()).toBe('Active');
    expect(meetingRoom.createdAt.getValue()).toBeInstanceOf(Date);
    expect(meetingRoom.updatedAt.getValue()).toBeInstanceOf(Date);
  });

  it('should throw an error for an invalid name', () => {
    expect(() => MeetingRoom.create('', 20)).toThrow(
      'Invalid meeting room name',
    );
  });

  it('should throw an error for an invalid capacity', () => {
    expect(() => MeetingRoom.create('Conference Room', 0)).toThrow(
      'Invalid meeting room capacity',
    );
  });
});

import { DuplicateMeetingRoomException } from './duplicate-meeting-room.exception';

describe('DuplicateMeetingRoomException', () => {
  it('should create an instance with the correct message and name', () => {
    const error = new DuplicateMeetingRoomException();
    expect(error.message).toBe('Duplicate MeetingRoom');
    expect(error.name).toBe('DuplicateMeetingRoomException');
  });
});

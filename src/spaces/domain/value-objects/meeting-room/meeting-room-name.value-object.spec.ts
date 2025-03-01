import { MeetingRoomName } from './meeting-room-name.value-object';

describe('MeetingRoomName Value Object', () => {
  it('should create a valid MeetingRoomName', () => {
    const name = new MeetingRoomName('Board Room');
    expect(name.getValue()).toBe('Board Room');
  });

  it('should trim whitespace', () => {
    const name = new MeetingRoomName('  Board Room  ');
    expect(name.getValue()).toBe('Board Room');
  });

  it('should throw an error for empty name', () => {
    expect(() => new MeetingRoomName('')).toThrow('Invalid meeting room name');
  });
});

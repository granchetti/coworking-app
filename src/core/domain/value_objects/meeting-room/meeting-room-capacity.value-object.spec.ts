import { MeetingRoomCapacity } from '../../domain/value_objects/meeting-room/meeting-room-capacity.value-object';

describe('MeetingRoomCapacity Value Object', () => {
  it('should create a valid MeetingRoomCapacity', () => {
    const capacity = new MeetingRoomCapacity(15);
    expect(capacity.getValue()).toBe(15);
  });

  it('should throw an error for non-positive or non-integer capacity', () => {
    expect(() => new MeetingRoomCapacity(0)).toThrow(
      'Invalid meeting room capacity',
    );
    expect(() => new MeetingRoomCapacity(-5)).toThrow(
      'Invalid meeting room capacity',
    );
    expect(() => new MeetingRoomCapacity(10.5)).toThrow(
      'Invalid meeting room capacity',
    );
  });
});

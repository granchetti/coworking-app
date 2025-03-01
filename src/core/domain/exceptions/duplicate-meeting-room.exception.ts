export class DuplicateMeetingRoomException extends Error {
  constructor() {
    super('Duplicate MeetingRoom');
    this.name = 'DuplicateMeetingRoomException';
  }
}

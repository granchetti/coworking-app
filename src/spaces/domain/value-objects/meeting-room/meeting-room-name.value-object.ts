export class MeetingRoomName {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Invalid meeting room name');
    }
    this.value = value.trim();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: MeetingRoomName): boolean {
    return this.value === other.value;
  }
}

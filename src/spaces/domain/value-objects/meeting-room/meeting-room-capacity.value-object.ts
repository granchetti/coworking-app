export class MeetingRoomCapacity {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Invalid meeting room capacity');
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: MeetingRoomCapacity): boolean {
    return this.value === other.value;
  }
}

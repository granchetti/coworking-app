export class HotDeskNumber {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Invalid hot desk number');
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: HotDeskNumber): boolean {
    return this.value === other.value;
  }
}

export class OfficeNumber {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Invalid office number');
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: OfficeNumber): boolean {
    return this.value === other.value;
  }
}

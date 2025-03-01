export class OfficeLeasePeriod {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 12) {
      throw new Error(
        'Invalid office lease period. The minimum lease period is 12 months.',
      );
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: OfficeLeasePeriod): boolean {
    return this.value === other.value;
  }
}

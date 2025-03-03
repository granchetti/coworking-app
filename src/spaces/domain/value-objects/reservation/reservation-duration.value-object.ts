export class ReservationDuration {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > 12) {
      throw new Error(
        'Invalid reservation duration. Expected an integer between 1 and 12.',
      );
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: ReservationDuration): boolean {
    return this.value === other.value;
  }
}

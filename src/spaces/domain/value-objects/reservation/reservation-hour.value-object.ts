export class ReservationHour {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 23) {
      throw new Error(
        'Invalid reservation hour. Expected an integer between 0 and 23.',
      );
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: ReservationHour): boolean {
    return this.value === other.value;
  }
}

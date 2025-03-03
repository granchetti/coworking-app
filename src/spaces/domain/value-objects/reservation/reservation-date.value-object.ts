export class ReservationDate {
  private readonly value: string;

  constructor(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('Invalid date format. Expected YYYY-MM-DD');
    }
    const dateObj = new Date(value);
    if (dateObj.toISOString().slice(0, 10) !== value) {
      throw new Error('Invalid date');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ReservationDate): boolean {
    return this.value === other.value;
  }
}

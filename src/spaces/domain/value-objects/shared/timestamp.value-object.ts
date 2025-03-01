export class Timestamp {
  private readonly date: Date;

  constructor(date?: Date) {
    this.date = date ? new Date(date) : new Date();
  }

  public getValue(): Date {
    return this.date;
  }

  public equals(other: Timestamp): boolean {
    return this.date.getTime() === other.date.getTime();
  }
}

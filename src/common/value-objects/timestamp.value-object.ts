export class Timestamp {
  private readonly date: Date;

  constructor(dateInput?: Date | string) {
    let date: Date;
    if (!dateInput) {
      date = new Date();
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      date = dateInput;
    }
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    this.date = date;
  }

  public getValue(): Date {
    return this.date;
  }

  public toISOString(): string {
    return this.date.toISOString();
  }
}

import { InvalidOfficeLeasePeriodException } from '../../exceptions/invalid-office-lease-period.exception';

export class OfficeLeasePeriod {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 12) {
      throw new InvalidOfficeLeasePeriodException();
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

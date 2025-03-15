import { InvalidCreditsException } from '../exceptions/invalid-credits.exception';

export class Credits {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidCreditsException();
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: Credits): boolean {
    return this.value === other.value;
  }
}

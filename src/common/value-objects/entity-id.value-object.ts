import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { InvalidUuidException } from '../exceptions/invalid-uuid.exception';

export class Uuid {
  private readonly value: string;

  constructor(value?: string) {
    if (value === undefined) {
      this.value = uuidv4();
    } else {
      if (value.trim() === '' || !uuidValidate(value)) {
        throw new InvalidUuidException();
      }
      this.value = value;
    }
  }

  public getValue(): string {
    return this.value;
  }
}

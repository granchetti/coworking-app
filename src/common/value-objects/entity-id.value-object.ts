import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid {
  private readonly value: string;

  constructor(value?: string) {
    if (value === undefined) {
      this.value = uuidv4();
    } else {
      if (value.trim() === '') {
        throw new Error('Invalid userId');
      }
      if (!uuidValidate(value)) {
        throw new Error('Invalid UUID');
      }
      this.value = value;
    }
  }

  public getValue(): string {
    return this.value;
  }
}

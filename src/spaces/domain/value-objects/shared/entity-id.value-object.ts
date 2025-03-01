import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid {
  private readonly value: string;

  constructor(value?: string) {
    if (value && !uuidValidate(value)) {
      throw new Error('Invalid UUID');
    }
    this.value = value ? value : uuidv4();
  }

  public getValue(): string {
    return this.value;
  }
}

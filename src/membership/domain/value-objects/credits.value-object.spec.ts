import { InvalidCreditsException } from '../exceptions/invalid-credits.exception';
import { Credits } from './credits.value-object';

describe('Credits Value Object', () => {
  it('should create a Credits value object with a valid number', () => {
    const credits = new Credits(100);
    expect(credits.getValue()).toBe(100);
  });

  it('should throw an error if credits is not a positive integer', () => {
    expect(() => new Credits(0)).toThrow(InvalidCreditsException);
    expect(() => new Credits(12.5)).toThrow(InvalidCreditsException);
    expect(() => new Credits(-5)).toThrow(InvalidCreditsException);
  });
});

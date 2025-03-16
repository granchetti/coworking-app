import { InvalidCreditsException } from './invalid-credits.exception';

describe('InvalidCreditsException', () => {
  it('should have the correct message and name', () => {
    const exception = new InvalidCreditsException();
    expect(exception.message).toBe('Invalid credits');
    expect(exception.name).toBe('InvalidCreditsException');
  });
});

import { InvalidUuidException } from './invalid-uuid.exception';

describe('InvalidUuidException', () => {
  it('should have the correct message and name', () => {
    const exception = new InvalidUuidException();
    expect(exception.message).toBe('Invalid UUID');
    expect(exception.name).toBe('InvalidUuidException');
  });
});

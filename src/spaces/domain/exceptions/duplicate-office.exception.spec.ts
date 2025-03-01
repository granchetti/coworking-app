import { DuplicateOfficeException } from './duplicate-office.exception';

describe('DuplicateOfficeException', () => {
  it('should have correct message and name', () => {
    const error = new DuplicateOfficeException();
    expect(error.message).toBe('Duplicate Office');
    expect(error.name).toBe('DuplicateOfficeException');
  });
});

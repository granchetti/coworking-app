import { DuplicateHotDeskException } from './duplicate-hotdesk.exception';

describe('DuplicateHotDeskException', () => {
  it('should create an instance with the correct message', () => {
    const error = new DuplicateHotDeskException();
    expect(error.message).toBe('Duplicate HotDesk');
    expect(error.name).toBe('DuplicateHotDeskException');
  });
});

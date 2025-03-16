import { StartDateInPastException } from './start-date-in-past.exception';

describe('StartDateInPastException', () => {
  it('should have the correct message and name', () => {
    const exception = new StartDateInPastException();
    expect(exception.message).toBe('The start date cannot be in the past');
    expect(exception.name).toBe('StartDateInPastException');
  });
});

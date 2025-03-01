import { Timestamp } from './timestamp.value-object';

describe('Timestamp Value Object', () => {
  it('should create a Timestamp with the current date if not provided', () => {
    const timestamp = new Timestamp();
    expect(timestamp.getValue()).toBeInstanceOf(Date);
  });

  it('should create a Timestamp with the provided date', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const timestamp = new Timestamp(date);
    expect(timestamp.getValue().toISOString()).toBe(date.toISOString());
  });

  it('should correctly compare two equal Timestamps', () => {
    const date = new Date();
    const timestamp1 = new Timestamp(date);
    const timestamp2 = new Timestamp(new Date(date.getTime()));
    expect(timestamp1.equals(timestamp2)).toBe(true);
  });
});

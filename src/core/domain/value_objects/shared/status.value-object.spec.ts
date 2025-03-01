import { Status } from './status.value-object';

describe('Status Value Object', () => {
  it('should create a valid Status with "Active"', () => {
    const status = new Status('Active');
    expect(status.getValue()).toBe('Active');
  });

  it('should create a valid Status with "Inactive"', () => {
    const status = new Status('Inactive');
    expect(status.getValue()).toBe('Inactive');
  });

  it('should throw an error for an invalid status', () => {
    expect(() => new Status('Invalid' as any)).toThrow(
      'Invalid HotDesk status',
    );
  });

  it('should correctly compare two Status objects', () => {
    const status1 = new Status('Active');
    const status2 = new Status('Active');
    const status3 = new Status('Inactive');
    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  });

  it('should create "active" and "inactive" statuses using static methods', () => {
    const activeStatus = Status.active();
    const inactiveStatus = Status.inactive();
    expect(activeStatus.getValue()).toBe('Active');
    expect(inactiveStatus.getValue()).toBe('Inactive');
  });
});

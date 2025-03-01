import { HotDeskStatus } from './hotdesk-status.value-object';

describe('HotDeskStatus Value Object', () => {
  it('should create a valid HotDeskStatus with "Active"', () => {
    const status = new HotDeskStatus('Active');
    expect(status.getValue()).toBe('Active');
  });

  it('should create a valid HotDeskStatus with "Inactive"', () => {
    const status = new HotDeskStatus('Inactive');
    expect(status.getValue()).toBe('Inactive');
  });

  it('should throw an error for an invalid status', () => {
    expect(() => new HotDeskStatus('Invalid' as any)).toThrow(
      'Invalid HotDesk status',
    );
  });

  it('should correctly compare two HotDeskStatus objects', () => {
    const status1 = new HotDeskStatus('Active');
    const status2 = new HotDeskStatus('Active');
    const status3 = new HotDeskStatus('Inactive');
    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  });

  it('should create "active" and "inactive" statuses using static methods', () => {
    const activeStatus = HotDeskStatus.active();
    const inactiveStatus = HotDeskStatus.inactive();
    expect(activeStatus.getValue()).toBe('Active');
    expect(inactiveStatus.getValue()).toBe('Inactive');
  });
});

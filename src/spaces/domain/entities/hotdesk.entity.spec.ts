import { HotDesk } from './hotdesk.entity';

describe('HotDesk Entity', () => {
  it('should create a valid HotDesk', () => {
    const hotDesk = HotDesk.create(1);

    expect(hotDesk).toBeDefined();
    expect(hotDesk.id).toBeDefined();
    expect(hotDesk.number.getValue()).toBe(1);
    expect(hotDesk.status.getValue()).toBe('Active');
    expect(hotDesk.createdAt.getValue()).toBeInstanceOf(Date);
    expect(hotDesk.updatedAt.getValue()).toBeInstanceOf(Date);
  });

  it('should throw error when creating a HotDesk with invalid number', () => {
    expect(() => HotDesk.create(0)).toThrow('Invalid hot desk number');
    expect(() => HotDesk.create(-5)).toThrow('Invalid hot desk number');
  });
});

import { HotDeskNumber } from './hotdesk-number.value-object';

describe('HotDeskNumber Value Object', () => {
  it('should create a valid HotDeskNumber', () => {
    const numberVO = new HotDeskNumber(5);
    expect(numberVO.getValue()).toBe(5);
  });

  it('should throw error for invalid number', () => {
    expect(() => new HotDeskNumber(0)).toThrow('Invalid hot desk number');
    expect(() => new HotDeskNumber(-3)).toThrow('Invalid hot desk number');
  });
});

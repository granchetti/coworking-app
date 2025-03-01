import { OfficeNumber } from './office-number.value-object';

describe('OfficeNumber Value Object', () => {
  it('should create a valid OfficeNumber', () => {
    const numberVO = new OfficeNumber(5);
    expect(numberVO.getValue()).toBe(5);
  });

  it('should throw error for invalid number', () => {
    expect(() => new OfficeNumber(0)).toThrow('Invalid office number');
    expect(() => new OfficeNumber(-3)).toThrow('Invalid office number');
  });
});

import { Office } from '../../domain/entities/office.entity';

describe('Office Entity', () => {
  it('should create a valid Office with default leasePeriod (12) and status "Active"', () => {
    const office = Office.create(101);
    expect(office.number.getValue()).toBe(101);
    expect(office.leasePeriod.getValue()).toBe(12);
    expect(office.status.getValue()).toBe('Active');
    expect(office.createdAt.getValue()).toBeInstanceOf(Date);
  });

  it('should create an Office with given leasePeriod and status', () => {
    const office = Office.create(102, 24, 'Inactive');
    expect(office.leasePeriod.getValue()).toBe(24);
    expect(office.status.getValue()).toBe('Inactive');
  });

  it('should throw an error if leasePeriod is less than 12', () => {
    expect(() => Office.create(103, 6)).toThrow(
      'Invalid office lease period. The minimum lease period is 12 months.',
    );
  });
});

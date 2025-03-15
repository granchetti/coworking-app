import { Membership } from './membership.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { DuplicatePackageForPeriodException } from '../exceptions/duplicate-package-for-period.exception';

describe('Membership Entity', () => {
  const validUserId = new Uuid();

  it('should create a membership with a valid userId', () => {
    const membership = Membership.create(validUserId);
    expect(membership).toBeDefined();
    expect(membership.id.getValue()).toBeDefined();
    expect(membership.userId.getValue()).toEqual(validUserId.getValue());
    expect(membership.active).toBe(true);
    expect(membership.createdAt.getValue()).toBeInstanceOf(Date);
    expect(membership.packages).toHaveLength(0);
  });

  it('should throw an error if userId is invalid', () => {
    expect(() => Membership.create(new Uuid(''))).toThrow('Invalid userId');
  });
});

describe('Membership Entity - addPackage', () => {
  const userId = new Uuid();

  it('should add a package successfully for a given period', () => {
    const membership = Membership.create(userId);
    const pkg = membership.addPackage(20, 2050, 5);
    expect(pkg).toBeDefined();
    expect(membership.packages).toContain(pkg);
  });

  it('should throw DuplicatePackageForPeriodException for same year and month', () => {
    const membership = Membership.create(userId);
    membership.addPackage(20, 2050, 5);
    expect(() => membership.addPackage(15, 2050, 5)).toThrow(
      DuplicatePackageForPeriodException,
    );
  });

  it('should allow packages for different periods', () => {
    const membership = Membership.create(userId);
    membership.addPackage(20, 2050, 5);
    expect(() => membership.addPackage(15, 2050, 6)).not.toThrow();
  });
});

import { Membership } from './membership.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

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

  it('should add a package successfully', () => {
    const membership = Membership.create(validUserId);
    const pkg = membership.addPackage(20, 2050, 1);
    expect(pkg).toBeDefined();
    expect(pkg.credits.getValue()).toBe(20);
    expect(membership.packages).toContain(pkg);
  });
});

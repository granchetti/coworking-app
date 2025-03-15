import { InMemoryMembershipReadRepository } from './inmemory-membership-read.repository';
import { Membership } from '../../domain/entities/membership.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

describe('InMemoryMembershipReadRepository', () => {
  let repository: InMemoryMembershipReadRepository;
  let membership: Membership;
  const userId = new Uuid();

  beforeEach(() => {
    repository = new InMemoryMembershipReadRepository();
    membership = Membership.create(userId);
  });

  it('should save and find a membership by userId', async () => {
    await repository.save(membership);
    const found = await repository.findByUserId(userId.getValue());
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(membership.id.getValue());
  });

  it('should return null if membership is not found', async () => {
    const found = await repository.findByUserId('non-existent-id');
    expect(found).toBeNull();
  });
});

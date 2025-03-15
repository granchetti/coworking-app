import { InMemoryMembershipEventStoreRepository } from './inmemory-membership-event-store.repository';
import { MembershipCreatedEvent } from '../../domain/events/membership-created.event';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

describe('InMemoryMembershipEventStoreRepository', () => {
  let repository: InMemoryMembershipEventStoreRepository;

  beforeEach(() => {
    repository = new InMemoryMembershipEventStoreRepository();
  });

  it('should save an event', async () => {
    const event = new MembershipCreatedEvent(new Uuid(), new Uuid());
    await repository.save(event);
    expect((repository as any).events).toContain(event);
  });
});

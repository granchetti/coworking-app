import { MembershipCreatedEvent } from '../../domain/events/membership-created.event';
import { IMembershipEventStoreRepository } from '../../domain/repositories/membership-event-store.repository.interface';

export class InMemoryMembershipEventStoreRepository
  implements IMembershipEventStoreRepository
{
  private events: any[] = [];

  async save(event: MembershipCreatedEvent): Promise<void> {
    this.events.push(event);
  }
}

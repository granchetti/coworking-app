import { MembershipCreatedEvent } from '../events/membership-created.event';

export interface IMembershipEventStoreRepository {
  /**
   * Persists a domain event to the event store.
   */
  save(event: MembershipCreatedEvent): Promise<void>;
}

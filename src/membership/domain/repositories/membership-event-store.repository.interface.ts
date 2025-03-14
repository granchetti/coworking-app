import { MembershipCreatedEvent } from '../events/membership-created.event';

export interface IMembershipEventStoreRepository {
  save(event: MembershipCreatedEvent): Promise<void>;
}

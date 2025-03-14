import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Membership } from '../entities/membership.entity';

export interface IMembershipReadRepository {
  findByUserId(id: Uuid): Promise<Membership | null>;
  save(membership: Membership): Promise<void>;
}

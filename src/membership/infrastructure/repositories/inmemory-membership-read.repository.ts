import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';
import { Membership } from '../../domain/entities/membership.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class InMemoryMembershipReadRepository
  implements IMembershipReadRepository
{
  private memberships: Membership[] = [];

  async findByUserId(userId: Uuid): Promise<Membership | null> {
    return this.memberships.find((m) => m.userId === userId) || null;
  }

  async save(membership: Membership): Promise<void> {
    this.memberships.push(membership);
  }
}

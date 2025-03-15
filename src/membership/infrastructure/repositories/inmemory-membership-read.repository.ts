import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';
import { Membership } from '../../domain/entities/membership.entity';

export class InMemoryMembershipReadRepository
  implements IMembershipReadRepository
{
  private memberships: Membership[] = [];

  async findByUserId(userId: string): Promise<Membership | null> {
    return this.memberships.find((m) => m.userId.getValue() === userId) || null;
  }

  async findById(membershipId: string): Promise<Membership | null> {
    return (
      this.memberships.find((m) => m.id.getValue() === membershipId) || null
    );
  }

  async save(membership: Membership): Promise<void> {
    this.memberships.push(membership);
  }
}

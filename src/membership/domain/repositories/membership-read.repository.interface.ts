import { Membership } from '../entities/membership.entity';

export interface IMembershipReadRepository {
  findByUserId(id: string): Promise<Membership | null>;
  save(membership: Membership): Promise<void>;
}

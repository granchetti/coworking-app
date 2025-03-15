import { Membership } from '../entities/membership.entity';

export interface IMembershipReadRepository {
  findById(id: string): Promise<Membership | null>;
  findByUserId(id: string): Promise<Membership | null>;
  save(membership: Membership): Promise<void>;
}

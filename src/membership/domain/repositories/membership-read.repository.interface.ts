import { Membership } from '../entities/membership.entity';

export interface IMembershipReadRepository {
  /**
   * Retrieves a membership by userId.
   */
  findByUserId(userId: string): Promise<Membership | null>;

  /**
   * Persists or updates the membership in the read model.
   */
  save(membership: Membership): Promise<void>;
}

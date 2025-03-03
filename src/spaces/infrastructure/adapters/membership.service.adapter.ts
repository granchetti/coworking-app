/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMembershipService } from '../../domain/ports/membership.service.interface';

export class MembershipServiceAdapter implements IMembershipService {
  async getMembershipData(
    _userId: string,
    _date: string,
  ): Promise<{ membershipId: string; remainingCredits: number }> {
    return { membershipId: 'dummy-membership-id', remainingCredits: 5 };
  }
}

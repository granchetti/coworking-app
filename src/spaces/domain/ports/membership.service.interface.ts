export interface IMembershipService {
  getMembershipData(
    userId: string,
    date: string,
  ): Promise<{
    membershipId: string;
    remainingCredits: number;
  }>;
}

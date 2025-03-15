export class MembershipResponseDto {
  id: string;
  userId: string;
  active: boolean;
  createdAt: string;
  packages?: {
    id: string;
    credits: number;
    startDate: string;
    endDate: string;
  }[];
}

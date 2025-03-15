import { MembershipResponseDto } from '../dtos/membership.dto';
import { Membership } from '../../domain/entities/membership.entity';

export function toMembershipResponseDto(
  membership: Membership,
): MembershipResponseDto {
  return {
    id: membership.id.getValue(),
    userId: membership.userId.getValue(),
    active: membership.active,
    createdAt: membership.createdAt.toISOString(),
    packages: membership.packages.map((pkg) => ({
      id: pkg.id.getValue(),
      credits: pkg.credits.getValue(),
      startDate: pkg.startDate.toISOString(),
      endDate: pkg.endDate.toISOString(),
    })),
  };
}

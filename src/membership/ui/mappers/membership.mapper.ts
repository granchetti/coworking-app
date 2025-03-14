import { MembershipResponseDto } from '../dtos/membership.dto';
import { Membership } from '../../domain/entities/membership.entity';

export function toMembershipResponseDto(
  membership: Membership,
): MembershipResponseDto {
  return {
    id: membership.id.getValue(),
    userId: membership.userId.getValue(),
    active: membership.active,
    createdAt: membership.createdAt.getValue().toISOString(),
  };
}

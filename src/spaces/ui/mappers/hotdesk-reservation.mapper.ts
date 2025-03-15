import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { HotDeskReservationResponseDto } from '../dtos/hotdesk-reservation-response.dto';

export function toHotDeskReservationResponseDto(
  reservation: HotDeskReservation,
): HotDeskReservationResponseDto {
  return {
    id: reservation.id.getValue(),
    userId: reservation.userId.getValue(),
    date: reservation.date.getValue(),
    status: reservation.status.getValue(),
    createdAt: reservation.createdAt.toISOString(),
    updatedAt: reservation.updatedAt.toISOString(),
    includedInMembership: reservation.includedInMembership,
  };
}

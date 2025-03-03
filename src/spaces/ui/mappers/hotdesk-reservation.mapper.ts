import { HotDeskReservation } from 'src/spaces/domain/entities/hotdesk-reservation.entity';
import { HotDeskReservationResponseDto } from '../dtos/hotdesk-reservation-response.dto';

export function toHotDeskReservationResponseDto(
  reservation: HotDeskReservation,
): HotDeskReservationResponseDto {
  return {
    id: reservation.id.getValue(),
    userId: reservation.userId.getValue(),
    date: reservation.date.getValue(),
    status: reservation.status.getValue(),
    createdAt: reservation.createdAt.getValue().toISOString(),
    updatedAt: reservation.updatedAt.getValue().toISOString(),
    includedInMembership: reservation.includedInMembership,
  };
}

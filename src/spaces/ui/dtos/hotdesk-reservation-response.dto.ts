import { ReservationResponseDto } from './reservation-response.dto';

export class HotDeskReservationResponseDto extends ReservationResponseDto {
  includedInMembership: boolean;
}

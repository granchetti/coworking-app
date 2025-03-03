import { ReservationResponseDto } from './reservation-response.dto';

export class MeetingRoomReservationResponseDto extends ReservationResponseDto {
  meetingRoomId: string;
  hour: number;
  duration: number;
  complimentaryHotDeskId?: string;
}

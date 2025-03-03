import { MeetingRoomReservation } from 'src/spaces/domain/entities/meeting-room-reservation.entity';
import { MeetingRoomReservationResponseDto } from '../dtos/meeting-room-reservation-response.dto';

export function toMeetingRoomReservationResponseDto(
  reservation: MeetingRoomReservation,
): MeetingRoomReservationResponseDto {
  return {
    id: reservation.id.getValue(),
    userId: reservation.userId.getValue(),
    date: reservation.date.getValue(),
    status: reservation.status.getValue(),
    createdAt: reservation.createdAt.getValue().toISOString(),
    updatedAt: reservation.updatedAt.getValue().toISOString(),
    meetingRoomId: reservation.meetingRoomId.getValue(),
    hour: reservation.hour.getValue(),
    duration: reservation.duration.getValue(),
    complimentaryHotDeskId: reservation.complimentaryHotDeskId
      ? reservation.complimentaryHotDeskId.getValue()
      : undefined,
  };
}

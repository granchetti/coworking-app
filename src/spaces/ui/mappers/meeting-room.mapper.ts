import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { MeetingRoomResponseDto } from '../dtos/meeting-room-response.dto';

export function toMeetingRoomResponseDto(
  meetingRoom: MeetingRoom,
): MeetingRoomResponseDto {
  return {
    id: meetingRoom.id.getValue(),
    name: meetingRoom.name.getValue(),
    capacity: meetingRoom.capacity.getValue(),
    status: meetingRoom.status.getValue(),
    createdAt: meetingRoom.createdAt.getValue().toISOString(),
    updatedAt: meetingRoom.updatedAt.getValue().toISOString(),
  };
}

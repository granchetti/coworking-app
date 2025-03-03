import { IMeetingRoomReservationRepository } from '../../domain/repositories/meeting-room-reservation.repository.interface';
import { MeetingRoomReservation } from '../../domain/entities/meeting-room-reservation.entity';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { ReservationDate } from '../../domain/value-objects/reservation/reservation-date.value-object';

export class InMemoryMeetingRoomReservationRepository
  implements IMeetingRoomReservationRepository
{
  private reservations: MeetingRoomReservation[] = [];

  async findById(id: Uuid): Promise<MeetingRoomReservation | null> {
    return (
      this.reservations.find((r) => r.id.getValue() === id.getValue()) || null
    );
  }

  async findByMeetingRoom(
    meetingRoomId: Uuid,
    date: ReservationDate,
  ): Promise<MeetingRoomReservation[]> {
    return this.reservations.filter(
      (r) =>
        r.meetingRoomId.getValue() === meetingRoomId.getValue() &&
        r.date.getValue() === date.getValue(),
    );
  }

  async save(reservation: MeetingRoomReservation): Promise<void> {
    this.reservations.push(reservation);
  }
}

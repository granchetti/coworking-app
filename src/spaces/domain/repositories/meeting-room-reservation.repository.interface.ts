import { MeetingRoomReservation } from '../../domain/entities/meeting-room-reservation.entity';
import { IReservationRepository } from './reservation.repository.interface';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';

export interface IMeetingRoomReservationRepository
  extends IReservationRepository {
  findById(id: Uuid): Promise<MeetingRoomReservation | null>;
  findByMeetingRoom(
    meetingRoomId: Uuid,
    date: ReservationDate,
  ): Promise<MeetingRoomReservation[]>;
  save(reservation: MeetingRoomReservation): Promise<void>;
}

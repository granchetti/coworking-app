import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { IReservationRepository } from './reservation.repository.interface';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';

export interface IHotDeskReservationRepository extends IReservationRepository {
  findById(id: Uuid): Promise<HotDeskReservation | null>;
  findByUserAndDate(
    userId: Uuid,
    date: ReservationDate,
  ): Promise<HotDeskReservation | null>;
  save(reservation: HotDeskReservation): Promise<void>;
}

import { Reservation } from '../../domain/entities/reservation.entity';
import { Uuid } from '../value-objects/shared/entity-id.value-object';

export interface IReservationRepository {
  findById(id: Uuid): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<void>;
}

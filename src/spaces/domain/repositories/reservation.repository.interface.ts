import { Reservation } from '../../domain/entities/reservation.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export interface IReservationRepository {
  findById(id: Uuid): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<void>;
}

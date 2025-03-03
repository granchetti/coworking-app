import { IHotDeskReservationRepository } from '../../domain/repositories/hotdesk-reservation.repository.interface';
import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';

export class FakeInMemoryHotDeskReservationRepository
  implements IHotDeskReservationRepository
{
  private reservations: HotDeskReservation[] = [];

  async findById(id: Uuid): Promise<HotDeskReservation | null> {
    return (
      this.reservations.find((r) => r.id.getValue() === id.getValue()) || null
    );
  }

  async findByUserAndDate(
    userId: Uuid,
    date: ReservationDate,
  ): Promise<HotDeskReservation | null> {
    return (
      this.reservations.find(
        (r) =>
          r.userId.getValue() === userId.getValue() &&
          r.date.getValue() === date.getValue(),
      ) || null
    );
  }

  async save(reservation: HotDeskReservation): Promise<void> {
    this.reservations.push(reservation);
  }
}

import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { IHotDeskReservationRepository } from '../repositories/hotdesk-reservation.repository.interface';

export class HotDeskAssignmentService {
  public async assignHotDesk(
    userId: Uuid,
    date: ReservationDate,
    hotDeskRepository: InMemoryHotDeskRepository,
    hotDeskReservationRepository: IHotDeskReservationRepository,
  ): Promise<Uuid | undefined> {
    // Verificar si el usuario ya tiene una reserva de hot desk para esa fecha.
    const existing = await hotDeskReservationRepository.findByUserAndDate(
      userId,
      date,
    );
    if (existing) {
      return undefined;
    }
    // Si no tiene, se obtiene la lista de hot desks y se asigna el primero disponible.
    const hotDesks = await hotDeskRepository.getAll();
    return hotDesks.length > 0 ? hotDesks[0].id : undefined;
  }
}

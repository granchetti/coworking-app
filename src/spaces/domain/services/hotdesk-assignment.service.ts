import { IHotDeskRepository } from '../../domain/repositories/hotdesk.repository.interface';
import { IHotDeskReservationRepository } from '../../domain/repositories/hotdesk-reservation.repository.interface';
import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';

export class HotDeskAssignmentService {
  public async assignHotDesk(
    userId: Uuid,
    date: ReservationDate,
    hotDeskRepository: IHotDeskRepository,
    hotDeskReservationRepository: IHotDeskReservationRepository,
  ): Promise<Uuid | undefined> {
    const existing = await hotDeskReservationRepository.findByUserAndDate(
      userId,
      date,
    );
    if (existing) {
      return undefined;
    }
    const hotDesks = await hotDeskRepository.getAll();
    return hotDesks.length > 0 ? hotDesks[0].id : undefined;
  }
}

import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class ReserveHotDeskCommand {
  constructor(
    public readonly userId: Uuid,
    public readonly date: ReservationDate,
  ) {}
}

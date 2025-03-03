import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { InMemoryHotDeskReservationRepository } from './inmemory-hotdesk-reservation.repository';

describe('InMemoryHotDeskReservationRepository', () => {
  let repository: InMemoryHotDeskReservationRepository;

  beforeEach(() => {
    repository = new InMemoryHotDeskReservationRepository();
  });

  it('should save and retrieve a hotdesk reservation by id', async () => {
    const reservation = HotDeskReservation.create(
      new Uuid(),
      new ReservationDate('2099-12-31'),
      true,
    );
    await repository.save(reservation);
    const found = await repository.findById(reservation.id);
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(reservation.id.getValue());
  });

  it('should retrieve a hotdesk reservation by user and date', async () => {
    const userId = new Uuid();
    const reservation = HotDeskReservation.create(
      userId,
      new ReservationDate('2099-12-31'),
      true,
    );
    await repository.save(reservation);
    const found = await repository.findByUserAndDate(
      userId,
      new ReservationDate('2099-12-31'),
    );
    expect(found).toBeDefined();
    expect(found?.userId.getValue()).toBe(userId.getValue());
  });
});

import { FakeInMemoryHotDeskRepository } from '../../infrastructure/repositories/fake-inmemory-hotdesk.repository';
import { HotDeskReservation } from '../entities/hotdesk-reservation.entity';
import { HotDesk } from '../entities/hotdesk.entity';
import { ReservationDate } from '../value-objects/reservation-date.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { HotDeskAssignmentService } from './hotdesk-assignment.service';
import { FakeInMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/fake-inmemory-hotdesk-reservation.repository';

describe('HotDeskAssignmentService', () => {
  let service: HotDeskAssignmentService;
  let hotDeskRepo: FakeInMemoryHotDeskRepository;
  let hotDeskResRepo: FakeInMemoryHotDeskReservationRepository;
  let userId: Uuid;
  let date: ReservationDate;

  beforeEach(async () => {
    service = new HotDeskAssignmentService();
    hotDeskRepo = new FakeInMemoryHotDeskRepository();
    hotDeskResRepo = new FakeInMemoryHotDeskReservationRepository();
    userId = new Uuid();
    date = new ReservationDate('2099-12-31');
    const hotDesk = HotDesk.create(1);
    await hotDeskRepo.save(hotDesk);
  });

  it('should assign a hot desk if user has no reservation', async () => {
    const result = await service.assignHotDesk(
      userId,
      date,
      hotDeskRepo,
      hotDeskResRepo,
    );
    expect(result).toBeDefined();
    const hotDesks = await hotDeskRepo.getAll();
    expect(result?.getValue()).toBe(hotDesks[0].id.getValue());
  });

  it('should return undefined if user already has a hot desk reservation', async () => {
    const existingReservation = HotDeskReservation.create(userId, date, true);
    await hotDeskResRepo.save(existingReservation);
    const result = await service.assignHotDesk(
      userId,
      date,
      hotDeskRepo,
      hotDeskResRepo,
    );
    expect(result).toBeUndefined();
  });
});

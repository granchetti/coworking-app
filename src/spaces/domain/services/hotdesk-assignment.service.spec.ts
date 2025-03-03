import { FakeInMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/fake-inmemory-hotdesk-reservation.repository';
import { FakeInMemoryHotDeskRepository } from '../../infrastructure/repositories/fake-inmemory-hotdesk.repository';
import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { HotDeskAssignmentService } from './hotdesk-assignment.service';

describe('HotDeskAssignmentService', () => {
  const service = new HotDeskAssignmentService();
  const hotDeskRepo = new FakeInMemoryHotDeskRepository();
  const hotDeskResRepo = new FakeInMemoryHotDeskReservationRepository();
  const userId = new Uuid();
  const date = new ReservationDate('2099-12-31');

  it('should assign a hot desk if user has no reservation', async () => {
    const result = await service.assignHotDesk(
      userId,
      date,
      hotDeskRepo,
      hotDeskResRepo,
    );
    expect(result).toBeDefined();
    expect(result?.getValue()).toBe('hotdesk-uuid-1');
  });

  it('should return undefined if user already has a hot desk reservation', async () => {
    (hotDeskResRepo as any).reservations.push({
      userId,
      date,
    });
    const result = await service.assignHotDesk(
      userId,
      date,
      hotDeskRepo,
      hotDeskResRepo,
    );
    expect(result).toBeUndefined();
  });
});

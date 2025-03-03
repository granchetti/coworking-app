/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMembershipService } from 'src/spaces/domain/ports/membership.service.interface';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';
import { ReserveHotDeskUseCase } from './reserve-hotdesk.use-case';

class FakeMembershipService implements IMembershipService {
  async getMembershipData(
    _userId: string,
    _date: string,
  ): Promise<{ membershipId: string; remainingCredits: number }> {
    return { membershipId: 'dummy-membership-id', remainingCredits: 5 };
  }
}

describe('ReserveHotDeskUseCase', () => {
  let hotDeskReservationRepository: InMemoryHotDeskReservationRepository;
  let useCase: ReserveHotDeskUseCase;
  let membershipService: FakeMembershipService;

  beforeEach(() => {
    hotDeskReservationRepository = new InMemoryHotDeskReservationRepository();
    membershipService = new FakeMembershipService();
    useCase = new ReserveHotDeskUseCase(
      hotDeskReservationRepository,
      membershipService,
    );
  });

  it('should reserve a hot desk successfully when valid data is provided', async () => {
    const input = {
      userId: new Uuid().getValue(),
      date: '2099-12-31',
    };
    const reservation = await useCase.execute(input);
    expect(reservation.userId.getValue()).toBe(input.userId);
    expect(reservation.date.getValue()).toBe('2099-12-31');
    expect(reservation.status.getValue()).toBe('Active');
    expect(reservation.includedInMembership).toBe(true);
  });

  it('should throw an error if the user already has a hot desk reservation for that date', async () => {
    const userId = new Uuid().getValue();
    const input = { userId, date: '2099-12-31' };
    await useCase.execute(input);
    await expect(useCase.execute(input)).rejects.toThrow(
      'User already has a hotdesk reservation for the specified date',
    );
  });
});

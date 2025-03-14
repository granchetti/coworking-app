/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReserveHotDeskUseCase } from './reserve-hotdesk.use-case';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';
import { DuplicateHotDeskReservationException } from '../../domain/exceptions/duplicate-hotdesk-reservation.exception';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { ReserveHotDeskCommand } from '../commands/reserve-hotdesk.command';
import { IMembershipService } from '../../domain/ports/membership.service.interface';

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
  let membershipService: FakeMembershipService;
  let useCase: ReserveHotDeskUseCase;
  const userId = new Uuid();

  beforeEach(() => {
    hotDeskReservationRepository = new InMemoryHotDeskReservationRepository();
    membershipService = new FakeMembershipService();
    useCase = new ReserveHotDeskUseCase(
      hotDeskReservationRepository,
      membershipService,
    );
  });

  it('should reserve a hot desk successfully when valid data is provided', async () => {
    const command = new ReserveHotDeskCommand(
      userId,
      new ReservationDate('2099-12-31'),
    );
    const reservation = await useCase.execute(command);
    expect(reservation.userId.getValue()).toBe(command.userId.getValue());
    expect(reservation.date.getValue()).toBe(command.date.getValue());
    expect(reservation.status.getValue()).toBe('Active');
    expect(reservation.includedInMembership).toBe(true);
  });

  it('should throw an error if the user already has a hot desk reservation for that date', async () => {
    const command = new ReserveHotDeskCommand(
      userId,
      new ReservationDate('2099-12-31'),
    );
    await useCase.execute(command);
    await expect(useCase.execute(command)).rejects.toThrow(
      DuplicateHotDeskReservationException,
    );
  });
});

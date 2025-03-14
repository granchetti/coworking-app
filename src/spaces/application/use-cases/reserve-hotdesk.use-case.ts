import { DuplicateHotDeskReservationException } from '../../domain/exceptions/duplicate-hotdesk-reservation.exception';
import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { IHotDeskReservationRepository } from '../../domain/repositories/hotdesk-reservation.repository.interface';
import { IMembershipService } from '../../domain/ports/membership.service.interface';
import { ReserveHotDeskCommand } from '../commands/reserve-hotdesk.command';

export class ReserveHotDeskUseCase {
  constructor(
    private hotDeskReservationRepository: IHotDeskReservationRepository,
    private membershipService: IMembershipService,
  ) {}

  public async execute(
    command: ReserveHotDeskCommand,
  ): Promise<HotDeskReservation> {
    if (!command.userId || !command.date) {
      throw new Error('Invalid input data');
    }

    const userId = command.userId;
    const reservationDate = command.date;
    const existing = await this.hotDeskReservationRepository.findByUserAndDate(
      userId,
      reservationDate,
    );
    if (existing) {
      throw new DuplicateHotDeskReservationException();
    }

    const membershipData = await this.membershipService.getMembershipData(
      userId.getValue(),
      reservationDate.getValue(),
    );
    const includedInMembership = membershipData.remainingCredits > 0;

    const reservation = HotDeskReservation.create(
      userId,
      reservationDate,
      includedInMembership,
    );
    await this.hotDeskReservationRepository.save(reservation);
    return reservation;
  }
}

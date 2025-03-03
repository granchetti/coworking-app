import { DuplicateHotDeskReservationException } from '../../domain/exceptions/duplicate-hotdesk-reservation.exception';
import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { IHotDeskReservationRepository } from '../../domain/repositories/hotdesk-reservation.repository.interface';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { IMembershipService } from '../../domain/ports/membership.service.interface';

export class ReserveHotDeskUseCase {
  constructor(
    private hotDeskReservationRepository: IHotDeskReservationRepository,
    private membershipService: IMembershipService,
  ) {}

  public async execute(input: {
    userId: string;
    date: string;
  }): Promise<HotDeskReservation> {
    if (!input.userId || !input.date) {
      throw new Error('Invalid input data');
    }
    const userUuid = new Uuid(input.userId);
    const date = new ReservationDate(input.date);

    const existing = await this.hotDeskReservationRepository.findByUserAndDate(
      userUuid,
      date,
    );
    if (existing) {
      if (existing) {
        throw new DuplicateHotDeskReservationException();
      }
    }

    const membershipData = await this.membershipService.getMembershipData(
      input.userId,
      input.date,
    );
    const includedInMembership = membershipData.remainingCredits > 0;

    const reservation = HotDeskReservation.create(
      userUuid,
      date,
      includedInMembership,
    );
    await this.hotDeskReservationRepository.save(reservation);
    return reservation;
  }
}

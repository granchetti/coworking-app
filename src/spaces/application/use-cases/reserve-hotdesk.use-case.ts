import { DuplicateHotDeskReservationException } from '../../domain/exceptions/duplicate-hotdesk-reservation.exception';
import { HotDeskReservation } from '../../domain/entities/hotdesk-reservation.entity';
import { IHotDeskReservationRepository } from '../../domain/repositories/hotdesk-reservation.repository.interface';
import { ReservationDate } from '../../domain/value-objects/reservation/reservation-date.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';

// Simulated call to Membership bounded context
interface MembershipData {
  membershipId: string;
  remainingCredits: number;
}
async function getMembershipData(
  userId: string,
  date: string,
): Promise<MembershipData> {
  return { membershipId: 'dummy-membership-id', remainingCredits: 5 };
}

export class ReserveHotDeskUseCase {
  constructor(
    private hotDeskReservationRepository: IHotDeskReservationRepository,
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

    const membershipData = await getMembershipData(input.userId, input.date);
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

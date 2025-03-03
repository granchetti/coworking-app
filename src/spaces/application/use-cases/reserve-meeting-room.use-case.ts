import { MeetingRoomReservation } from '../../domain/entities/meeting-room-reservation.entity';
import { IMeetingRoomReservationRepository } from '../../domain/repositories/meeting-room-reservation.repository.interface';
import { IMeetingRoomRepository } from '../../domain/repositories/meeting-room.repository.interface';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { ReservationDate } from '../../domain/value-objects/reservation/reservation-date.value-object';
import { ReservationHour } from '../../domain/value-objects/reservation/reservation-hour.value-object';
import { ReservationDuration } from '../../domain/value-objects/reservation/reservation-duration.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { MeetingRoomReservationValidationService } from '../../domain/services/meeting-room-reservation-validation.service';
import { HotDeskAssignmentService } from '../../domain/services/hotdesk-assignment.service';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';

export class ReserveMeetingRoomUseCase {
  private validationService = new MeetingRoomReservationValidationService();
  private hotDeskAssignmentService = new HotDeskAssignmentService();

  constructor(
    private meetingRoomRepository: IMeetingRoomRepository,
    private meetingRoomReservationRepository: IMeetingRoomReservationRepository,
    private hotDeskReservationRepository: InMemoryHotDeskReservationRepository,
    private hotDeskRepository: InMemoryHotDeskRepository,
  ) {}

  public async execute(input: {
    meetingRoomId: string;
    date: string; // Format: YYYY-MM-DD
    hour: number; // Integer between 0 and 23
    duration: number; // Integer between 1 and 12
    userId: string;
  }): Promise<MeetingRoomReservation> {
    if (
      !input.meetingRoomId ||
      !input.date ||
      input.hour === undefined ||
      input.duration === undefined ||
      !input.userId
    ) {
      throw new Error('Invalid input data');
    }

    const reservationDate = new ReservationDate(input.date);
    const reservationHour = new ReservationHour(input.hour);
    const reservationDuration = new ReservationDuration(input.duration);

    this.validationService.validateForToday(reservationDate, reservationHour);

    const meetingRoom = await this.meetingRoomRepository.findById(
      new Uuid(input.meetingRoomId),
    );
    if (!meetingRoom) {
      throw new Error('Meeting room not found');
    }

    const existingReservations =
      await this.meetingRoomReservationRepository.findByMeetingRoom(
        new Uuid(input.meetingRoomId),
        reservationDate,
      );
    this.validationService.validateOverlapping(
      existingReservations.map((res) => ({
        hour: res.hour.getValue(),
        duration: res.duration.getValue(),
        status: {
          getValue: () => res.status.getValue(),
        },
      })),
      reservationHour,
      reservationDuration,
    );

    const reservation = MeetingRoomReservation.create(
      new Uuid(input.userId),
      reservationDate,
      new Uuid(input.meetingRoomId),
      reservationHour,
      reservationDuration,
    );

    // Intentar asignar un HotDesk de cortesía.
    const complimentaryHotDeskId =
      await this.hotDeskAssignmentService.assignHotDesk(
        new Uuid(input.userId),
        reservationDate,
        this.hotDeskRepository,
        this.hotDeskReservationRepository,
      );
    if (complimentaryHotDeskId) {
      reservation.assignComplimentaryHotDesk(complimentaryHotDeskId);
    }

    await this.meetingRoomReservationRepository.save(reservation);
    return reservation;
  }
}

import { MeetingRoomReservation } from '../../domain/entities/meeting-room-reservation.entity';
import { IMeetingRoomRepository } from '../../domain/repositories/meeting-room.repository.interface';
import { IMeetingRoomReservationRepository } from '../../domain/repositories/meeting-room-reservation.repository.interface';
import { MeetingRoomReservationValidationService } from '../../domain/services/meeting-room-reservation-validation.service';
import { ReserveMeetingRoomCommand } from '../commands/reserve-meeting-room.command';
import { IEventPublisher } from 'src/common/ports/event-publisher.interface';
import { MeetingRoomReservedEvent } from '../../domain/events/meeting-room-reserved.event';

export class ReserveMeetingRoomUseCase {
  private validationService = new MeetingRoomReservationValidationService();

  constructor(
    private meetingRoomRepository: IMeetingRoomRepository,
    private meetingRoomReservationRepository: IMeetingRoomReservationRepository,
    private eventPublisher: IEventPublisher,
  ) {}

  public async execute(
    command: ReserveMeetingRoomCommand,
  ): Promise<MeetingRoomReservation> {
    if (
      !command.meetingRoomId ||
      !command.date ||
      command.hour === undefined ||
      command.duration === undefined ||
      !command.userId
    ) {
      throw new Error('Invalid input data');
    }

    const reservationDate = command.date;
    const reservationHour = command.hour;
    const reservationDuration = command.duration;
    const meetingRoomId = command.meetingRoomId;
    const userId = command.userId;

    this.validationService.validateForToday(reservationDate, reservationHour);

    const meetingRoom =
      await this.meetingRoomRepository.findById(meetingRoomId);
    if (!meetingRoom) {
      throw new Error('Meeting room not found');
    }

    const existingReservations =
      await this.meetingRoomReservationRepository.findByMeetingRoom(
        meetingRoomId,
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
      userId,
      reservationDate,
      meetingRoomId,
      reservationHour,
      reservationDuration,
    );

    await this.meetingRoomReservationRepository.save(reservation);

    const event = new MeetingRoomReservedEvent(
      userId,
      meetingRoomId,
      reservationDate,
    );
    await this.eventPublisher.publish(event);

    return reservation;
  }
}

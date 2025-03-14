import { MeetingRoomReservation } from '../../domain/entities/meeting-room-reservation.entity';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { ReservationDuration } from '../../domain/value-objects/reservation-duration.value-object';
import { ReservationHour } from '../../domain/value-objects/reservation-hour.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { InMemoryMeetingRoomReservationRepository } from './inmemory-meeting-room-reservation.repository';

describe('InMemoryMeetingRoomReservationRepository', () => {
  let repository: InMemoryMeetingRoomReservationRepository;

  beforeEach(() => {
    repository = new InMemoryMeetingRoomReservationRepository();
  });

  it('should save and retrieve a meeting room reservation by id', async () => {
    const reservation = MeetingRoomReservation.create(
      new Uuid(),
      new ReservationDate('2099-12-31'),
      new Uuid(),
      new ReservationHour(10),
      new ReservationDuration(2),
    );
    await repository.save(reservation);
    const found = await repository.findById(reservation.id);
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(reservation.id.getValue());
  });

  it('should retrieve reservations by meeting room and date', async () => {
    const meetingRoomId = new Uuid();
    const reservation1 = MeetingRoomReservation.create(
      new Uuid(),
      new ReservationDate('2099-12-31'),
      meetingRoomId,
      new ReservationHour(10),
      new ReservationDuration(2),
    );
    const reservation2 = MeetingRoomReservation.create(
      new Uuid(),
      new ReservationDate('2099-12-31'),
      meetingRoomId,
      new ReservationHour(13),
      new ReservationDuration(2),
    );
    await repository.save(reservation1);
    await repository.save(reservation2);
    const results = await repository.findByMeetingRoom(
      meetingRoomId,
      new ReservationDate('2099-12-31'),
    );
    expect(results.length).toBe(2);
  });
});

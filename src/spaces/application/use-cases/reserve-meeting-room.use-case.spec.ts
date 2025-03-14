import { ReserveMeetingRoomUseCase } from './reserve-meeting-room.use-case';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { InMemoryMeetingRoomReservationRepository } from '../../infrastructure/repositories/inmemory-meeting-room-reservation.repository';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { ReserveMeetingRoomCommand } from '../commands/reserve-meeting-room.command';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { ReservationHour } from 'src/spaces/domain/value-objects/reservation-hour.value-object';
import { ReservationDuration } from 'src/spaces/domain/value-objects/reservation-duration.value-object';

describe('ReserveMeetingRoomUseCase', () => {
  let meetingRoomRepository: InMemoryMeetingRoomRepository;
  let meetingRoomReservationRepository: InMemoryMeetingRoomReservationRepository;
  let hotDeskReservationRepository: InMemoryHotDeskReservationRepository;
  let hotDeskRepository: InMemoryHotDeskRepository;
  let useCase: ReserveMeetingRoomUseCase;

  beforeEach(async () => {
    meetingRoomRepository = new InMemoryMeetingRoomRepository();
    meetingRoomReservationRepository =
      new InMemoryMeetingRoomReservationRepository();
    hotDeskReservationRepository = new InMemoryHotDeskReservationRepository();
    hotDeskRepository = new InMemoryHotDeskRepository();

    const meetingRoom = MeetingRoom.create('Meeting Room A', 20);
    await meetingRoomRepository.save(meetingRoom);

    const hotDesk = HotDesk.create(1);
    await hotDeskRepository.save(hotDesk);

    useCase = new ReserveMeetingRoomUseCase(
      meetingRoomRepository,
      meetingRoomReservationRepository,
      hotDeskReservationRepository,
      hotDeskRepository,
    );
  });

  it('should reserve a meeting room successfully when valid data is provided', async () => {
    const meetingRoomId = (await meetingRoomRepository.getAll())[0].id;
    const command = new ReserveMeetingRoomCommand(
      meetingRoomId,
      new ReservationDate('2099-12-31'),
      new ReservationHour(10),
      new ReservationDuration(2),
      new Uuid('00000000-0000-0000-0000-000000000003'),
    );
    const reservation = await useCase.execute(command);
    expect(reservation.meetingRoomId.getValue()).toBe(meetingRoomId.getValue());
    expect(reservation.hour.getValue()).toBe(10);
    expect(reservation.duration.getValue()).toBe(2);
  });
});

import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { InMemoryMeetingRoomReservationRepository } from '../../infrastructure/repositories/inmemory-meeting-room-reservation.repository';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { ReserveMeetingRoomUseCase } from './reserve-meeting-room.use-case';

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
    const meetingRoomId = (
      await meetingRoomRepository.getAll()
    )[0].id.getValue();
    const input = {
      meetingRoomId,
      date: '2099-12-31',
      hour: 10,
      duration: 2,
      userId: new Uuid().getValue(),
    };
    const reservation = await useCase.execute(input);
    expect(reservation.meetingRoomId.getValue()).toBe(meetingRoomId);
    expect(reservation.hour.getValue()).toBe(10);
    expect(reservation.duration.getValue()).toBe(2);
  });

  // Agregar tests para casos de error: sala no encontrada, solapamiento, hora inválida para hoy, etc.
});

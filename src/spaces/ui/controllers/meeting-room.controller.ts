import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterMeetingRoomUseCase } from '../../application/use-cases/register-meeting-room.use-case';
import { ReserveMeetingRoomUseCase } from '../../application/use-cases/reserve-meeting-room.use-case';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { InMemoryMeetingRoomReservationRepository } from '../../infrastructure/repositories/inmemory-meeting-room-reservation.repository';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';
import { toMeetingRoomResponseDto } from '../mappers/meeting-room.mapper';
import { toMeetingRoomReservationResponseDto } from '../mappers/meeting-room-reservation.mapper';
import { MeetingRoom } from '../../domain/entities/meeting-room.entity';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { ReserveMeetingRoomCommand } from '../../application/commands/reserve-meeting-room.command';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';
import { ReservationDuration } from '../../domain/value-objects/reservation-duration.value-object';
import { ReservationHour } from '../../domain/value-objects/reservation-hour.value-object';
import { RegisterMeetingRoomCommand } from '../../application/commands/register-meeting-room.command';

@Controller('meeting-rooms')
export class MeetingRoomController {
  private readonly registerMeetingRoomUseCase: RegisterMeetingRoomUseCase;
  private readonly reserveMeetingRoomUseCase: ReserveMeetingRoomUseCase;
  private readonly meetingRoomRepository: InMemoryMeetingRoomRepository;

  constructor() {
    const repository = new InMemoryMeetingRoomRepository();
    this.meetingRoomRepository = repository;
    this.registerMeetingRoomUseCase = new RegisterMeetingRoomUseCase(
      repository,
    );
    this.reserveMeetingRoomUseCase = new ReserveMeetingRoomUseCase(
      repository,
      new InMemoryMeetingRoomReservationRepository(),
      { publish: async () => {} },
    );
  }

  @Get()
  async findAll() {
    try {
      const meetingRooms = await this.meetingRoomRepository.getAll();
      return meetingRooms.map((room: MeetingRoom) =>
        toMeetingRoomResponseDto(room),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() body: { name: string; capacity: number }) {
    try {
      const command = new RegisterMeetingRoomCommand(body.name, body.capacity);
      const meetingRoom =
        await this.registerMeetingRoomUseCase.execute(command);
      return toMeetingRoomResponseDto(meetingRoom);
    } catch (error) {
      if (error instanceof DuplicateMeetingRoomException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (
        error.message === 'Invalid meeting room capacity' ||
        error.message === 'Invalid meeting room name'
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('reserve')
  async reserve(
    @Body()
    body: {
      meetingRoomId: string;
      date: string;
      hour: number;
      duration: number;
      userId: string;
    },
  ) {
    try {
      const command = new ReserveMeetingRoomCommand(
        new Uuid(body.meetingRoomId),
        new ReservationDate(body.date),
        new ReservationHour(body.hour),
        new ReservationDuration(body.duration),
        new Uuid(body.userId),
      );
      const reservation = await this.reserveMeetingRoomUseCase.execute(command);
      return toMeetingRoomReservationResponseDto(reservation);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.code || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterMeetingRoomUseCase } from '../../application/use-cases/register-meeting-room.use-case';
import { InMemoryMeetingRoomRepository } from '../../infrastructure/repositories/inmemory-meeting-room.repository';
import { DuplicateMeetingRoomException } from '../../domain/exceptions/duplicate-meeting-room.exception';
import { toMeetingRoomResponseDto } from '../mappers/meeting-room.mapper';

@Controller('meeting-room')
export class MeetingRoomController {
  private readonly registerMeetingRoomUseCase: RegisterMeetingRoomUseCase;

  constructor() {
    const repository = new InMemoryMeetingRoomRepository();
    this.registerMeetingRoomUseCase = new RegisterMeetingRoomUseCase(
      repository,
    );
  }

  @Post('register')
  async register(@Body() body: { name: string; capacity: number }) {
    try {
      const meetingRoom = await this.registerMeetingRoomUseCase.execute(body);
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
}

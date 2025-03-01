import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterMeetingRoomUseCase } from 'src/core/application/use-cases/register-meeting-room.use-case';
import { InMemoryMeetingRoomRepository } from 'src/core/infrastructure/repositories/inmemory-meeting-room.repository';

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
      return meetingRoom;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.code || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

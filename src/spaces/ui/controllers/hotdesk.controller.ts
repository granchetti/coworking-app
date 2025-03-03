import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterHotDeskUseCase } from '../../application/use-cases/register-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { DuplicateHotDeskException } from '../../domain/exceptions/duplicate-hotdesk.exception';
import { toHotDeskResponseDto } from '../mappers/hotdesk.mapper';
import { toHotDeskReservationResponseDto } from '../mappers/hotdesk-reservation.mapper';
import { ReserveHotDeskUseCase } from '../../application/use-cases/reserve-hotdesk.use-case';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';

@Controller('hotdesks')
export class HotDeskController {
  private readonly registerHotDeskUseCase: RegisterHotDeskUseCase;
  private readonly hotDeskRepository: InMemoryHotDeskRepository;
  private readonly reserveHotDeskUseCase: ReserveHotDeskUseCase;

  constructor() {
    const repository = new InMemoryHotDeskRepository();
    this.hotDeskRepository = repository;
    this.registerHotDeskUseCase = new RegisterHotDeskUseCase(repository);
    this.reserveHotDeskUseCase = new ReserveHotDeskUseCase(
      new InMemoryHotDeskReservationRepository(),
    );
  }

  @Get()
  async findAll() {
    try {
      const hotDesks = await this.hotDeskRepository.getAll();
      return hotDesks.map((hotDesk: HotDesk) => toHotDeskResponseDto(hotDesk));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() body: { number: number }) {
    try {
      const hotDesk = await this.registerHotDeskUseCase.execute(body);
      return toHotDeskResponseDto(hotDesk);
    } catch (error) {
      if (error instanceof DuplicateHotDeskException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.message === 'Invalid hot desk number') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('reserve')
  async reserve(@Body() body: { userId: string; date: string }) {
    try {
      const reservation = await this.reserveHotDeskUseCase.execute(body);
      return toHotDeskReservationResponseDto(reservation);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.code || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

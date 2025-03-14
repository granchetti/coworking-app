import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterHotDeskUseCase } from '../../application/use-cases/register-hotdesk.use-case';
import { ReserveHotDeskUseCase } from '../../application/use-cases/reserve-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { InMemoryHotDeskReservationRepository } from '../../infrastructure/repositories/inmemory-hotdesk-reservation.repository';
import { DuplicateHotDeskException } from '../../domain/exceptions/duplicate-hotdesk.exception';
import { DuplicateHotDeskReservationException } from '../../domain/exceptions/duplicate-hotdesk-reservation.exception';
import { MembershipServiceAdapter } from '../../infrastructure/adapters/membership.service.adapter';
import { toHotDeskResponseDto } from '../mappers/hotdesk.mapper';
import { toHotDeskReservationResponseDto } from '../mappers/hotdesk-reservation.mapper';
import { RegisterHotDeskCommand } from '../../application/commands/register-hotdesk.command';
import { ReserveHotDeskCommand } from '../../application/commands/reserve-hotdesk.command';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { ReservationDate } from '../../domain/value-objects/reservation-date.value-object';

@Controller('hotdesks')
export class HotDeskController {
  private readonly registerHotDeskUseCase: RegisterHotDeskUseCase;
  private readonly reserveHotDeskUseCase: ReserveHotDeskUseCase;
  private readonly hotDeskRepository: InMemoryHotDeskRepository;

  constructor() {
    const repository = new InMemoryHotDeskRepository();
    this.hotDeskRepository = repository;
    this.registerHotDeskUseCase = new RegisterHotDeskUseCase(repository);
    this.reserveHotDeskUseCase = new ReserveHotDeskUseCase(
      new InMemoryHotDeskReservationRepository(),
      new MembershipServiceAdapter(),
    );
  }

  @Get()
  async findAll() {
    try {
      const hotDesks = await this.hotDeskRepository.getAll();
      return hotDesks.map((hotDesk) => toHotDeskResponseDto(hotDesk));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() body: { number: number }) {
    try {
      const command = new RegisterHotDeskCommand(body.number);
      const hotDesk = await this.registerHotDeskUseCase.execute(command);
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
      const command = new ReserveHotDeskCommand(
        new Uuid(body.userId),
        new ReservationDate(body.date),
      );
      const reservation = await this.reserveHotDeskUseCase.execute(command);
      return toHotDeskReservationResponseDto(reservation);
    } catch (error) {
      if (error instanceof DuplicateHotDeskReservationException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message,
        error.code || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

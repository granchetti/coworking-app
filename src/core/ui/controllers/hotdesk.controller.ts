import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterHotDeskUseCase } from '../../application/use-cases/register-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { DuplicateHotDeskException } from '../../domain/exceptions/duplicate-hotdesk.exception';

@Controller('hotdesk')
export class HotDeskController {
  private readonly registerHotDeskUseCase: RegisterHotDeskUseCase;

  constructor() {
    const repository = new InMemoryHotDeskRepository();
    this.registerHotDeskUseCase = new RegisterHotDeskUseCase(repository);
  }

  @Post('register')
  async register(@Body() body: { number: number }) {
    try {
      const hotDesk = await this.registerHotDeskUseCase.execute(body);
      return hotDesk;
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
}

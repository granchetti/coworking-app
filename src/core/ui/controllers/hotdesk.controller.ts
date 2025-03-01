import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterHotDeskUseCase } from '../../application/use-cases/register-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';

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
      throw new HttpException(
        error.message,
        error.code || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterOfficeUseCase } from 'src/core/application/use-cases/register-office.use-case';
import { InMemoryOfficeRepository } from 'src/core/infrastructure/repositories/inmemory-office.repository';
import { DuplicateOfficeException } from 'src/core/domain/exceptions/duplicate-office.exception';
import { toOfficeRoomResponseDto } from '../mappers/office.mapper';
import { StatusType } from 'src/core/domain/value_objects/shared/status.value-object';

@Controller('office')
export class OfficeController {
  private readonly registerOfficeUseCase: RegisterOfficeUseCase;

  constructor() {
    const repository = new InMemoryOfficeRepository();
    this.registerOfficeUseCase = new RegisterOfficeUseCase(repository);
  }

  @Post('register')
  async register(
    @Body() body: { number: number; leasePeriod?: number; status?: StatusType },
  ) {
    try {
      const office = await this.registerOfficeUseCase.execute(body);
      return toOfficeRoomResponseDto(office);
    } catch (error) {
      if (error instanceof DuplicateOfficeException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.message.startsWith('Invalid')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

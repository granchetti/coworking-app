import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateMembershipCommand } from '../../application/commands/create-membership.command';
import { CreateMembershipCommandHandler } from '../../application/handlers/create-membership.command.handler';
import { toMembershipResponseDto } from '../mappers/membership.mapper';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { EventPublisherAdapter } from '../../infrastructure/adapters/event-publisher.adapter';
import { InMemoryMembershipEventStoreRepository } from '../../infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from '../../infrastructure/repositories/inmemory-membership-read.repository';

@Controller('memberships')
export class MembershipController {
  private readonly createMembershipCommandHandler: CreateMembershipCommandHandler;

  constructor() {
    const eventStoreRepo = new InMemoryMembershipEventStoreRepository();
    const readRepo = new InMemoryMembershipReadRepository();
    const eventPublisher = new EventPublisherAdapter();
    this.createMembershipCommandHandler = new CreateMembershipCommandHandler(
      eventStoreRepo,
      readRepo,
      eventPublisher,
    );
  }

  @Post('create')
  async create(@Body() body: { userId: string }) {
    try {
      const userId = new Uuid(body.userId);
      const command = new CreateMembershipCommand(userId);
      const membership =
        await this.createMembershipCommandHandler.execute(command);
      return toMembershipResponseDto(membership);
    } catch (error) {
      console.error('Error in MembershipController.create:', error);
      if (error instanceof DuplicateMembershipException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.message && error.message.startsWith('Invalid')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

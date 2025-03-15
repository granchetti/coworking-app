import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { CreateMembershipCommand } from '../../application/commands/create-membership.command';
import { CreateMembershipCommandHandler } from '../../application/handlers/create-membership.command.handler';
import { toMembershipResponseDto } from '../mappers/membership.mapper';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { RegisterPackageCommand } from '../../application/commands/register-package.command';
import { RegisterPackageCommandHandler } from '../../application/handlers/register-package.command.handler';
import { GetFullMembershipSummaryQuery } from '../../application/queries/get-full-membership-summary.query';
import { GetFullMembershipSummaryQueryHandler } from '../../application/handlers/get-full-membership-summary.query.handler';
import { InvalidUuidException } from '../../../common/exceptions/invalid-uuid.exception';

@Controller('memberships')
export class MembershipController {
  constructor(
    private readonly createMembershipCommandHandler: CreateMembershipCommandHandler,
    private readonly registerPackageCommandHandler: RegisterPackageCommandHandler,
    private readonly queryHandler: GetFullMembershipSummaryQueryHandler,
  ) {}

  @Post('create')
  async create(@Body() body: { userId: string }) {
    try {
      const userId = new Uuid(body.userId);
      const command = new CreateMembershipCommand(userId);
      const membership =
        await this.createMembershipCommandHandler.execute(command);
      return toMembershipResponseDto(membership);
    } catch (error) {
      if (error instanceof DuplicateMembershipException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.message && error.message.startsWith('Invalid')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register-package')
  async subscribePackage(
    @Body()
    body: {
      membershipId: string;
      credits: number;
      year: number;
      month: number;
    },
  ) {
    try {
      const command = new RegisterPackageCommand(
        new Uuid(body.membershipId),
        body.credits,
        body.year,
        body.month,
      );
      const membership =
        await this.registerPackageCommandHandler.execute(command);
      return toMembershipResponseDto(membership);
    } catch (error) {
      if (error.message && error.message.startsWith('Invalid')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('summary')
  async getSummary(@Query('userId') userIdStr: string) {
    try {
      if (!userIdStr || userIdStr.trim() === '') {
        throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
      }
      const userId = new Uuid(userIdStr);
      const query = new GetFullMembershipSummaryQuery(userId);
      const summary = await this.queryHandler.execute(query);
      return summary;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof InvalidUuidException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

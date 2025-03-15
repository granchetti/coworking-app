import { Module } from '@nestjs/common';
import { MembershipController } from './ui/controllers/membership.controller';
import { CreateMembershipCommandHandler } from './application/handlers/create-membership.command.handler';
import { InMemoryMembershipEventStoreRepository } from './infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from './infrastructure/repositories/inmemory-membership-read.repository';
import { EventPublisherAdapter } from './infrastructure/adapters/event-publisher.adapter';
import { GetFullMembershipSummaryQueryHandler } from './application/handlers/get-full-membership-summary.query.handler';
import { RegisterPackageCommandHandler } from './application/handlers/register-package.command.handler';

@Module({
  controllers: [MembershipController],
  providers: [
    CreateMembershipCommandHandler,
    RegisterPackageCommandHandler,
    GetFullMembershipSummaryQueryHandler,
    {
      provide: 'IMembershipEventStoreRepository',
      useClass: InMemoryMembershipEventStoreRepository,
    },
    {
      provide: 'IMembershipReadRepository',
      useClass: InMemoryMembershipReadRepository,
    },
    {
      provide: 'IEventPublisher',
      useClass: EventPublisherAdapter,
    },
  ],
  exports: [
    CreateMembershipCommandHandler,
    RegisterPackageCommandHandler,
    GetFullMembershipSummaryQueryHandler,
  ],
})
export class MembershipModule {}

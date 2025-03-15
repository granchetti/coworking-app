import { Module } from '@nestjs/common';
import { MembershipController } from './ui/controllers/membership.controller';
import { CreateMembershipCommandHandler } from './application/handlers/create-membership.command.handler';
import { InMemoryMembershipEventStoreRepository } from './infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from './infrastructure/repositories/inmemory-membership-read.repository';
import { EventPublisherAdapter } from './infrastructure/adapters/event-publisher.adapter';
import { RegisterPackageCommandHandler } from './application/handlers/register-package.command.handler';

@Module({
  controllers: [MembershipController],
  providers: [
    CreateMembershipCommandHandler,
    RegisterPackageCommandHandler,
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
  exports: [CreateMembershipCommandHandler, RegisterPackageCommandHandler],
})
export class MembershipModule {}

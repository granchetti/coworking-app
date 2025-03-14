import { CreateMembershipCommand } from '../commands/create-membership.command';
import { Membership } from '../../domain/entities/membership.entity';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { MembershipCreatedEvent } from '../../domain/events/membership-created.event';
import { IEventPublisher } from '../../../common/ports/event-publisher.interface';
import { IMembershipEventStoreRepository } from '../../domain/repositories/membership-event-store.repository.interface';
import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateMembershipCommandHandler {
  constructor(
    @Inject('IMembershipEventStoreRepository')
    private eventStoreRepository: IMembershipEventStoreRepository,
    @Inject('IMembershipReadRepository')
    private readRepository: IMembershipReadRepository,
    @Inject('IEventPublisher')
    private eventPublisher: IEventPublisher,
  ) {}

  public async execute(command: CreateMembershipCommand): Promise<Membership> {
    const existing = await this.readRepository.findByUserId(
      command.userId.getValue(),
    );
    if (existing) {
      throw new DuplicateMembershipException();
    }

    const membership = Membership.create(command.userId);

    const event = new MembershipCreatedEvent(membership.id, membership.userId);

    await this.eventStoreRepository.save(event);

    await this.eventPublisher.publish(event);

    await this.readRepository.save(membership);

    return membership;
  }
}

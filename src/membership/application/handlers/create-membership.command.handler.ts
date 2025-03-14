import { CreateMembershipCommand } from '../commands/create-membership.command';
import { Membership } from '../../domain/entities/membership.entity';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { MembershipCreatedEvent } from '../../domain/events/membership-created.event';
import { IEventPublisher } from '../../../common/ports/event-publisher.interface';
import { IMembershipEventStoreRepository } from '../../domain/repositories/membership-event-store.repository.interface';
import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';

export class CreateMembershipCommandHandler {
  constructor(
    private eventStoreRepository: IMembershipEventStoreRepository,
    private readRepository: IMembershipReadRepository,
    private eventPublisher: IEventPublisher,
  ) {}

  public async execute(command: CreateMembershipCommand): Promise<Membership> {
    // Check if membership already exists using the read model.
    const existing = await this.readRepository.findByUserId(command.userId);
    if (existing) {
      throw new DuplicateMembershipException();
    }

    // Create the membership aggregate.
    const membership = Membership.create(command.userId);

    // Create the domain event.
    const event = new MembershipCreatedEvent(
      membership.id.getValue(),
      membership.userId,
    );

    // Persist the event in the event store.
    await this.eventStoreRepository.save(event);

    // Publish the event to notify other parts of the system.
    await this.eventPublisher.publish(event);

    // Update the read model.
    await this.readRepository.save(membership);

    return membership;
  }
}

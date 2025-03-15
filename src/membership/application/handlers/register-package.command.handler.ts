import { Injectable, Inject } from '@nestjs/common';
import { RegisterPackageCommand } from '../commands/register-package.command';
import { Membership } from '../../domain/entities/membership.entity';
import { PackageSubscribedEvent } from '../../domain/events/package-subscribed.event';
import { IMembershipEventStoreRepository } from '../../domain/repositories/membership-event-store.repository.interface';
import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';
import { IEventPublisher } from '../../../common/ports/event-publisher.interface';

@Injectable()
export class RegisterPackageCommandHandler {
  constructor(
    @Inject('IMembershipEventStoreRepository')
    private eventStoreRepository: IMembershipEventStoreRepository,
    @Inject('IMembershipReadRepository')
    private readRepository: IMembershipReadRepository,
    @Inject('IEventPublisher')
    private eventPublisher: IEventPublisher,
  ) {}

  public async execute(command: RegisterPackageCommand): Promise<Membership> {
    const membership = await this.readRepository.findById(
      command.membershipId.getValue(),
    );
    if (!membership) {
      throw new Error('Membership not found');
    }
    const membershipPackage = membership.addPackage(
      command.credits,
      command.year,
      command.month,
    );

    const event = new PackageSubscribedEvent(
      membership.id,
      membershipPackage.id,
      membershipPackage.credits,
      membershipPackage.startDate,
      membershipPackage.endDate,
    );

    await this.eventStoreRepository.save(event);
    await this.eventPublisher.publish(event);
    await this.readRepository.save(membership);

    return membership;
  }
}

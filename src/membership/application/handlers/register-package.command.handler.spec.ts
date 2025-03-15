import { RegisterPackageCommandHandler } from './register-package.command.handler';
import { RegisterPackageCommand } from '../commands/register-package.command';
import { Membership } from '../../domain/entities/membership.entity';
import { PackageSubscribedEvent } from '../../domain/events/package-subscribed.event';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { InMemoryMembershipEventStoreRepository } from '../../infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from '../../infrastructure/repositories/inmemory-membership-read.repository';
import { EventPublisherAdapter } from '../../infrastructure/adapters/event-publisher.adapter';

describe('RegisterPackageCommandHandler', () => {
  let handler: RegisterPackageCommandHandler;
  let fakeEventStoreRepo: Partial<InMemoryMembershipEventStoreRepository>;
  let fakeReadRepo: Partial<InMemoryMembershipReadRepository>;
  let fakeEventPublisher: Partial<EventPublisherAdapter>;
  let membership: Membership;
  let membershipId: Uuid;
  let userId: Uuid;

  beforeEach(() => {
    fakeEventStoreRepo = {
      save: jest.fn().mockResolvedValue(undefined),
    };

    fakeEventPublisher = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    userId = new Uuid();
    membership = Membership.create(userId);
    membershipId = membership.id;

    fakeReadRepo = {
      findById: jest.fn().mockResolvedValue(membership),
      save: jest.fn().mockResolvedValue(undefined),
    };

    handler = new RegisterPackageCommandHandler(
      fakeEventStoreRepo as InMemoryMembershipEventStoreRepository,
      fakeReadRepo as InMemoryMembershipReadRepository,
      fakeEventPublisher as EventPublisherAdapter,
    );
  });

  it('should register a package successfully when valid data is provided', async () => {
    const command = new RegisterPackageCommand(membershipId, 100, 2050, 1);

    const result = await handler.execute(command);

    expect(result).toBe(membership);
    expect(result.packages.length).toBe(1);
    const pkg = result.packages[0];
    expect(pkg.credits.getValue()).toBe(100);

    expect(fakeEventStoreRepo.save).toHaveBeenCalledTimes(1);
    expect(fakeEventPublisher.publish).toHaveBeenCalledTimes(1);
    expect(fakeReadRepo.save).toHaveBeenCalledTimes(1);

    const publishedEvent = (fakeEventPublisher.publish as jest.Mock).mock
      .calls[0][0];
    expect(publishedEvent).toBeInstanceOf(PackageSubscribedEvent);
    expect(publishedEvent.aggregateId.value).toBe(membership.id.getValue());
    expect(publishedEvent.packageId.value).toBe(pkg.id.getValue());
    expect(publishedEvent.credits.getValue()).toBe(100);
  });

  it('should throw an error if membership is not found', async () => {
    (fakeReadRepo.findById as jest.Mock).mockResolvedValue(null);
    const command = new RegisterPackageCommand(membershipId, 100, 2050, 1);
    await expect(handler.execute(command)).rejects.toThrow(
      'Membership not found',
    );
  });
});

import { CreateMembershipCommand } from '../commands/create-membership.command';
import { CreateMembershipCommandHandler } from './create-membership.command.handler';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { EventPublisherAdapter } from '../../infrastructure/adapters/event-publisher.adapter';
import { InMemoryMembershipEventStoreRepository } from '../../infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from '../../infrastructure/repositories/inmemory-membership-read.repository';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';

describe('CreateMembershipCommandHandler', () => {
  let handler: CreateMembershipCommandHandler;
  let eventStoreRepo: InMemoryMembershipEventStoreRepository;
  let readRepo: InMemoryMembershipReadRepository;
  let eventPublisher: EventPublisherAdapter;
  let userId: Uuid;

  beforeEach(() => {
    eventStoreRepo = new InMemoryMembershipEventStoreRepository();
    readRepo = new InMemoryMembershipReadRepository();
    eventPublisher = new EventPublisherAdapter();
    jest.spyOn(eventPublisher, 'publish').mockResolvedValue(undefined);

    handler = new CreateMembershipCommandHandler(
      eventStoreRepo,
      readRepo,
      eventPublisher,
    );
  });

  it('should create a membership successfully when valid data is provided', async () => {
    userId = new Uuid();
    const command = new CreateMembershipCommand(userId);
    const membership = await handler.execute(command);

    expect(membership.userId).toBe(userId);
    expect(membership.active).toBe(true);
    expect(membership.createdAt.getValue()).toBeDefined();
    expect(eventPublisher.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        aggregateId: { value: membership.id.getValue() },
        userId: { value: userId.getValue() },
      }),
    );
  });

  it('should throw an error if a membership already exists for the same user', async () => {
    userId = new Uuid();
    const command = new CreateMembershipCommand(userId);
    await handler.execute(command);
    await expect(handler.execute(command)).rejects.toThrow(
      DuplicateMembershipException,
    );
  });
});

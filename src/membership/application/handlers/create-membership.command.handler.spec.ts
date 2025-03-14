import { CreateMembershipCommand } from '../commands/create-membership.command';
import { CreateMembershipCommandHandler } from './create-membership.command.handler';
import { DuplicateMembershipException } from '../../domain/exceptions/duplicate-membership.exception';
import { EventPublisherAdapter } from '../../infrastructure/adapters/event-publisher.adapter';
import { InMemoryMembershipEventStoreRepository } from '../../infrastructure/repositories/inmemory-membership-event-store.repository';
import { InMemoryMembershipReadRepository } from '../../infrastructure/repositories/inmemory-membership-read.repository';

describe('CreateMembershipCommandHandler', () => {
  let handler: CreateMembershipCommandHandler;
  let eventStoreRepo: InMemoryMembershipEventStoreRepository;
  let readRepo: InMemoryMembershipReadRepository;
  let eventPublisher: EventPublisherAdapter;

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
    const command = new CreateMembershipCommand('user-123');
    const membership = await handler.execute(command);

    expect(membership.userId).toBe('user-123');
    expect(membership.active).toBe(true);
    expect(membership.createdAt.getValue()).toBeDefined();
    expect(eventPublisher.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        membershipId: membership.id.getValue(),
        userId: 'user-123',
      }),
    );
  });

  it('should throw an error if a membership already exists for the same user', async () => {
    const command = new CreateMembershipCommand('user-456');
    // Create first membership successfully.
    await handler.execute(command);
    // A second attempt should throw.
    await expect(handler.execute(command)).rejects.toThrow(DuplicateMembershipException);
  });
});

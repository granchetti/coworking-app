import { GetFullMembershipSummaryQueryHandler } from './get-full-membership-summary.query.handler';
import { InMemoryMembershipReadRepository } from '../../infrastructure/repositories/inmemory-membership-read.repository';
import { GetFullMembershipSummaryQuery } from '../queries/get-full-membership-summary.query';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Membership } from '../../domain/entities/membership.entity';

describe('GetFullMembershipSummaryQueryHandler', () => {
  let handler: GetFullMembershipSummaryQueryHandler;
  let membershipReadRepository: InMemoryMembershipReadRepository;
  let userId: Uuid;
  let membership: Membership;

  beforeEach(async () => {
    membershipReadRepository = new InMemoryMembershipReadRepository();
    handler = new GetFullMembershipSummaryQueryHandler(
      membershipReadRepository,
    );
    userId = new Uuid();
    membership = Membership.create(userId);
    membership.addPackage(30, 2050, 1);
    membership.addPackage(15, 2050, 2);
    await membershipReadRepository.save(membership);
  });

  it('should return the membership summary with total credits', async () => {
    const query = new GetFullMembershipSummaryQuery(userId);
    const summary = await handler.execute(query);
    console.log(summary);
    expect(summary).toBeDefined();
    expect(summary.id).toBe(membership.id.getValue());
    expect(summary.userId).toBe(userId.getValue());
    expect(summary.totalCredits).toBe(45);
  });

  it('should throw NotFoundException if membership is not found', async () => {
    const unknownUserId = new Uuid();
    const query = new GetFullMembershipSummaryQuery(unknownUserId);
    await expect(handler.execute(query)).rejects.toThrow(
      'Membership not found',
    );
  });
});

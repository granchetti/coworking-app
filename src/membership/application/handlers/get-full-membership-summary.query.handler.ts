import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFullMembershipSummaryQuery } from '../queries/get-full-membership-summary.query';
import { IMembershipReadRepository } from '../../domain/repositories/membership-read.repository.interface';
import { MembershipSummaryDto } from '../dtos/membership-summary.dto';

@Injectable()
export class GetFullMembershipSummaryQueryHandler {
  constructor(
    private readonly membershipReadRepository: IMembershipReadRepository,
  ) {}

  public async execute(
    query: GetFullMembershipSummaryQuery,
  ): Promise<MembershipSummaryDto> {
    const membership = await this.membershipReadRepository.findByUserId(
      query.userId.getValue(),
    );
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    const totalCredits = membership.packages.reduce(
      (sum, pkg) => sum + pkg.credits.getValue(),
      0,
    );

    return {
      id: membership.id.getValue(),
      userId: membership.userId.getValue(),
      totalCredits,
    };
  }
}

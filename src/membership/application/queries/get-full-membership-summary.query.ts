import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class GetFullMembershipSummaryQuery {
  constructor(public readonly userId: Uuid) {}
}

import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class MembershipCreatedEvent {
  public readonly aggregateId: Uuid;
  public readonly userId: Uuid;
  public readonly occurredOn: Date;

  constructor(aggregateId: Uuid, userId: Uuid) {
    this.aggregateId = aggregateId;
    this.userId = userId;
    this.occurredOn = new Date();
  }
}

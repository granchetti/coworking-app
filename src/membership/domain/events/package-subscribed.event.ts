import { Timestamp } from 'src/common/value-objects/timestamp.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Credits } from '../value-objects/credits.value-object';

export class PackageSubscribedEvent {
  public readonly aggregateId: Uuid;
  public readonly packageId: Uuid;
  public readonly credits: Credits;
  public readonly startDate: Timestamp;
  public readonly endDate: Timestamp;
  public readonly occurredOn: Date;

  constructor(
    aggregateId: Uuid,
    packageId: Uuid,
    credits: Credits,
    startDate: Timestamp,
    endDate: Timestamp,
  ) {
    this.aggregateId = aggregateId;
    this.packageId = packageId;
    this.credits = credits;
    this.startDate = startDate;
    this.endDate = endDate;
    this.occurredOn = new Date();
  }
}

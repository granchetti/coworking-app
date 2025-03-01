import { HotDeskNumber } from '../value_objects/hotdesk-number.value-object';
import { HotDeskStatus } from '../value_objects/hotdesk-status.value-object';
import { Uuid } from '../value_objects/shared/entity-id.value-object';
import { Timestamp } from '../value_objects/shared/timestamp.value-object';

export class HotDesk {
  public readonly id: Uuid;
  public readonly number: HotDeskNumber;
  public status: HotDeskStatus;
  public readonly createdAt: Timestamp;
  public updatedAt: Timestamp;

  private constructor(number: HotDeskNumber) {
    this.id = new Uuid();
    this.number = number;
    this.status = HotDeskStatus.active();
    this.createdAt = new Timestamp();
    this.updatedAt = new Timestamp();
  }

  public static create(number: number): HotDesk {
    const hotDeskNumber = new HotDeskNumber(number);
    return new HotDesk(hotDeskNumber);
  }
}

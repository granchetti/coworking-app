import { HotDeskNumber } from '../value-objects/hotdesk/hotdesk-number.value-object';
import { Status } from '../value-objects/shared/status.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { Timestamp } from '../value-objects/shared/timestamp.value-object';

export class HotDesk {
  private readonly _id: Uuid;
  private readonly _number: HotDeskNumber;
  private _status: Status;
  private readonly _createdAt: Timestamp;
  private _updatedAt: Timestamp;

  private constructor(number: HotDeskNumber) {
    this._id = new Uuid();
    this._number = number;
    this._status = Status.active();
    this._createdAt = new Timestamp();
    this._updatedAt = new Timestamp();
  }

  public static create(number: number): HotDesk {
    const hotDeskNumber = new HotDeskNumber(number);
    return new HotDesk(hotDeskNumber);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get number(): HotDeskNumber {
    return this._number;
  }

  public get status(): Status {
    return this._status;
  }

  public get createdAt(): Timestamp {
    return this._createdAt;
  }

  public get updatedAt(): Timestamp {
    return this._updatedAt;
  }

  public updateStatus(newStatus: Status): void {
    this._status = newStatus;
    this._updatedAt = new Timestamp();
  }
}

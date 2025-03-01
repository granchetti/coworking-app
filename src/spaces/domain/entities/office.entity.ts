import { Uuid } from 'src/spaces/domain/value-objects/shared/entity-id.value-object';
import { Timestamp } from 'src/spaces/domain/value-objects/shared/timestamp.value-object';
import {
  Status,
  StatusType,
} from 'src/spaces/domain/value-objects/shared/status.value-object';
import { OfficeNumber } from 'src/spaces/domain/value-objects/office/office-number.value-object';
import { OfficeLeasePeriod } from 'src/spaces/domain/value-objects/office/office-lease-period.value-object';

export class Office {
  private readonly _id: Uuid;
  private readonly _number: OfficeNumber;
  private readonly _leasePeriod: OfficeLeasePeriod;
  private _status: Status;
  private readonly _createdAt: Timestamp;
  private _updatedAt: Timestamp;

  private constructor(
    number: OfficeNumber,
    leasePeriod: OfficeLeasePeriod,
    status: Status,
  ) {
    this._id = new Uuid();
    this._number = number;
    this._leasePeriod = leasePeriod;
    this._status = status;
    this._createdAt = new Timestamp();
    this._updatedAt = new Timestamp();
  }

  public static create(
    number: number,
    leasePeriod?: number,
    status?: StatusType,
  ): Office {
    const officeNumber = new OfficeNumber(number);
    const officeLeasePeriod = new OfficeLeasePeriod(
      leasePeriod !== undefined ? leasePeriod : 12,
    );
    const officeStatus = status ? new Status(status) : Status.active();
    return new Office(officeNumber, officeLeasePeriod, officeStatus);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get number(): OfficeNumber {
    return this._number;
  }

  public get leasePeriod(): OfficeLeasePeriod {
    return this._leasePeriod;
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

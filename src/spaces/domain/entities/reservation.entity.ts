import { ReservationDate } from '../value-objects/reservation/reservation-date.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';
import { Status } from '../value-objects/shared/status.value-object';
import { Timestamp } from '../value-objects/shared/timestamp.value-object';

export abstract class Reservation {
  protected readonly _id: Uuid;
  protected readonly _userId: Uuid;
  protected readonly _date: ReservationDate;
  protected _status: Status;
  protected readonly _createdAt: Timestamp;
  protected _updatedAt: Timestamp;

  protected constructor(userId: Uuid, date: ReservationDate, status: Status) {
    this._id = new Uuid();
    this._userId = userId;
    this._date = date;
    this._status = status;
    this._createdAt = new Timestamp();
    this._updatedAt = new Timestamp();
  }

  public get id(): Uuid {
    return this._id;
  }
  public get userId(): Uuid {
    return this._userId;
  }
  public get date(): ReservationDate {
    return this._date;
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

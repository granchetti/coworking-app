import { Uuid } from '../../../spaces/domain/value-objects/shared/entity-id.value-object';
import { Timestamp } from '../../../spaces/domain/value-objects/shared/timestamp.value-object';

export class Membership {
  private readonly _id: Uuid;
  private readonly _userId: Uuid;
  private _active: boolean;
  private readonly _createdAt: Timestamp;

  private constructor(userId: string) {
    this._id = new Uuid();
    this._userId = new Uuid(userId);
    this._active = true;
    this._createdAt = new Timestamp();
  }

  public static create(userId: string): Membership {
    return new Membership(userId);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get userId(): Uuid {
    return this._userId;
  }

  public get active(): boolean {
    return this._active;
  }

  public get createdAt(): Timestamp {
    return this._createdAt;
  }
}

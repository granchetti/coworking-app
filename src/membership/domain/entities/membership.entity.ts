import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Timestamp } from '../../../common/value-objects/timestamp.value-object';

export class Membership {
  private readonly _id: Uuid;
  private readonly _userId: Uuid;
  private _active: boolean;
  private readonly _createdAt: Timestamp;

  private constructor(userId: Uuid) {
    this._id = new Uuid();
    this._userId = userId;
    this._active = true;
    this._createdAt = new Timestamp();
  }

  public static create(userId: Uuid): Membership {
    if (!userId || userId.getValue().trim() === '') {
      throw new Error('Invalid userId');
    }
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

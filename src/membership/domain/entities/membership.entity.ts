import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Timestamp } from '../../../common/value-objects/timestamp.value-object';

export class Membership {
  private readonly _id: Uuid;
  private readonly _userId: string;
  private _active: boolean;
  private readonly _createdAt: Timestamp;

  private constructor(userId: string) {
    this._id = new Uuid();
    this._userId = userId;
    this._active = true;
    this._createdAt = new Timestamp();
  }

  public static create(userId: string): Membership {
    if (!userId || userId.trim() === '') {
      throw new Error('Invalid userId');
    }
    return new Membership(userId);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get userId(): string {
    return this._userId;
  }

  public get active(): boolean {
    return this._active;
  }

  public get createdAt(): Timestamp {
    return this._createdAt;
  }
}

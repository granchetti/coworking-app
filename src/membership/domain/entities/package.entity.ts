import { Timestamp } from '../../../common/value-objects/timestamp.value-object';
import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Credits } from '../value-objects/credits.value-object';

export class Package {
  private readonly _id: Uuid;
  private readonly _credits: Credits;
  private readonly _startDate: Timestamp;
  private readonly _endDate: Timestamp;

  private constructor(
    credits: Credits,
    startDate: Timestamp,
    endDate: Timestamp,
  ) {
    this._id = new Uuid();
    this._credits = credits;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  public static create(
    credits: number,
    startDate: Date,
    endDate: Date,
  ): Package {
    const creditsVO = new Credits(credits);
    const startTimestamp = new Timestamp(startDate);
    const endTimestamp = new Timestamp(endDate);
    return new Package(creditsVO, startTimestamp, endTimestamp);
  }

  public get id(): Uuid {
    return this._id;
  }

  public get credits(): Credits {
    return this._credits;
  }

  public get startDate(): Timestamp {
    return this._startDate;
  }

  public get endDate(): Timestamp {
    return this._endDate;
  }
}

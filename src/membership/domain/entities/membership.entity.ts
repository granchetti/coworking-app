import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { Timestamp } from '../../../common/value-objects/timestamp.value-object';
import { InvalidCreditsException } from '../exceptions/invalid-credits.exception';
import { InvalidYearMonthException } from '../exceptions/invalid-year-month.exception';
import { Package } from './package.entity';

export class Membership {
  private readonly _id: Uuid;
  private readonly _userId: Uuid;
  private _active: boolean;
  private readonly _createdAt: Timestamp;
  private _packages: Package[];

  private constructor(userId: Uuid) {
    this._id = new Uuid();
    this._userId = userId;
    this._active = true;
    this._createdAt = new Timestamp();
    this._packages = [];
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

  public get packages(): Package[] {
    return this._packages;
  }

  public addPackage(credits: number, year: number, month: number): Package {
    if (!Number.isInteger(credits) || credits <= 0) {
      throw new InvalidCreditsException();
    }
    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      throw new InvalidYearMonthException();
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const membershipPackage = Package.create(credits, startDate, endDate);
    this._packages.push(membershipPackage);
    return membershipPackage;
  }
}

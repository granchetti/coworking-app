export type StatusType = 'Active' | 'Inactive';

export class Status {
  private readonly status: StatusType;

  constructor(status: StatusType) {
    if (status !== 'Active' && status !== 'Inactive') {
      throw new Error('Invalid HotDesk status');
    }
    this.status = status;
  }

  public getValue(): StatusType {
    return this.status;
  }

  public equals(other: Status): boolean {
    return this.status === other.status;
  }

  public static active(): Status {
    return new Status('Active');
  }

  public static inactive(): Status {
    return new Status('Inactive');
  }
}

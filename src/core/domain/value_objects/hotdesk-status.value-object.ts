export type HotDeskStatusType = 'Active' | 'Inactive';

export class HotDeskStatus {
  private readonly status: HotDeskStatusType;

  constructor(status: HotDeskStatusType) {
    if (status !== 'Active' && status !== 'Inactive') {
      throw new Error('Invalid HotDesk status');
    }
    this.status = status;
  }

  public getValue(): HotDeskStatusType {
    return this.status;
  }

  public equals(other: HotDeskStatus): boolean {
    return this.status === other.status;
  }

  public static active(): HotDeskStatus {
    return new HotDeskStatus('Active');
  }

  public static inactive(): HotDeskStatus {
    return new HotDeskStatus('Inactive');
  }
}

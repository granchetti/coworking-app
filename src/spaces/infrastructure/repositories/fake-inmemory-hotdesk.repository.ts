import { IHotDeskRepository } from '../../domain/repositories/hotdesk.repository.interface';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';
import { HotDeskNumber } from '../../domain/value-objects/hotdesk-number.value-object';

export class FakeInMemoryHotDeskRepository implements IHotDeskRepository {
  private hotDesks: HotDesk[] = [];

  async getAll(): Promise<HotDesk[]> {
    return this.hotDesks;
  }

  async findById(id: Uuid): Promise<HotDesk | null> {
    return (
      this.hotDesks.find((hd) => hd.id.getValue() === id.getValue()) || null
    );
  }

  async findByNumber(number: HotDeskNumber): Promise<HotDesk | null> {
    return this.hotDesks.find((hd) => hd.number.equals(number)) || null;
  }

  seed(hotDesks: HotDesk[]): void {
    this.hotDesks = hotDesks;
  }

  async save(hotDesk: HotDesk): Promise<void> {
    this.hotDesks.push(hotDesk);
  }
}

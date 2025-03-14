import { Uuid } from '../../../common/value-objects/entity-id.value-object';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { IHotDeskRepository } from '../../domain/repositories/hotdesk.repository.interface';
import { HotDeskNumber } from '../../domain/value-objects/hotdesk-number.value-object';

export class InMemoryHotDeskRepository implements IHotDeskRepository {
  private hotDesks: HotDesk[] = [];

  async findById(id: Uuid): Promise<HotDesk | null> {
    return (
      this.hotDesks.find((hd) => hd.id.getValue() === id.getValue()) || null
    );
  }

  async findByNumber(number: HotDeskNumber): Promise<HotDesk | null> {
    return this.hotDesks.find((hd) => hd.number.equals(number)) || null;
  }

  async getAll(): Promise<HotDesk[]> {
    return this.hotDesks;
  }

  async save(hotDesk: HotDesk): Promise<void> {
    this.hotDesks.push(hotDesk);
  }
}

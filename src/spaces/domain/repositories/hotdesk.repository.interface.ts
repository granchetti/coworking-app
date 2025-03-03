import { HotDesk } from '../entities/hotdesk.entity';
import { HotDeskNumber } from '../value-objects/hotdesk-number.value-object';
import { Uuid } from '../value-objects/shared/entity-id.value-object';

export interface IHotDeskRepository {
  getAll(): Promise<HotDesk[]>;
  findById(id: Uuid): Promise<HotDesk | null>;
  findByNumber(number: HotDeskNumber): Promise<HotDesk | null>;
  save(hotDesk: HotDesk): Promise<void>;
}

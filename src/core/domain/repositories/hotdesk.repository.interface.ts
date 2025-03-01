// src/domain/repositories/hotdesk.repository.interface.ts
import { HotDesk } from '../entities/hotdesk.entity';
import { HotDeskNumber } from '../value_objects/hotdesk-number.value-object';
import { Uuid } from '../value_objects/shared/entity-id.value-object';

export interface IHotDeskRepository {
  findById(id: Uuid): Promise<HotDesk | null>;
  findByNumber(number: HotDeskNumber): Promise<HotDesk | null>;
  save(hotDesk: HotDesk): Promise<void>;
}

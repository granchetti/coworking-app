import { Office } from '../../domain/entities/office.entity';
import { OfficeNumber } from '../../domain/value-objects/office-number.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';

export interface IOfficeRepository {
  findById(id: Uuid): Promise<Office | null>;
  findByNumber(number: OfficeNumber): Promise<Office | null>;
  save(office: Office): Promise<void>;
}

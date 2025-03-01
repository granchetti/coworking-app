import { Office } from 'src/core/domain/entities/office.entity';
import { OfficeNumber } from 'src/core/domain/value_objects/office/office-number.value-object';
import { Uuid } from 'src/core/domain/value_objects/shared/entity-id.value-object';

export interface IOfficeRepository {
  findById(id: Uuid): Promise<Office | null>;
  findByNumber(number: OfficeNumber): Promise<Office | null>;
  save(office: Office): Promise<void>;
}

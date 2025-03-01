import { Office } from 'src/spaces/domain/entities/office.entity';
import { OfficeNumber } from 'src/spaces/domain/value-objects/office/office-number.value-object';
import { Uuid } from 'src/spaces/domain/value-objects/shared/entity-id.value-object';

export interface IOfficeRepository {
  findById(id: Uuid): Promise<Office | null>;
  findByNumber(number: OfficeNumber): Promise<Office | null>;
  save(office: Office): Promise<void>;
}

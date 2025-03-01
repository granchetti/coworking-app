import { Office } from 'src/spaces/domain/entities/office.entity';
import { IOfficeRepository } from 'src/spaces/domain/repositories/office.repository.interface';
import { OfficeNumber } from 'src/spaces/domain/value-objects/office/office-number.value-object';
import { Uuid } from 'src/spaces/domain/value-objects/shared/entity-id.value-object';

export class InMemoryOfficeRepository implements IOfficeRepository {
  private offices: Office[] = [];

  async findById(id: Uuid): Promise<Office | null> {
    return this.offices.find((o) => o.id.getValue() === id.getValue()) || null;
  }

  async findByNumber(number: OfficeNumber): Promise<Office | null> {
    return this.offices.find((o) => o.number.equals(number)) || null;
  }

  async save(office: Office): Promise<void> {
    this.offices.push(office);
  }
}

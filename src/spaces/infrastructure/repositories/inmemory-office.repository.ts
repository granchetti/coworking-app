import { Office } from '../../domain/entities/office.entity';
import { IOfficeRepository } from '../../domain/repositories/office.repository.interface';
import { OfficeNumber } from '../../domain/value-objects/office/office-number.value-object';
import { Uuid } from '../../domain/value-objects/shared/entity-id.value-object';

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

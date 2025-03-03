import { InMemoryOfficeRepository } from '../../infrastructure/repositories/inmemory-office.repository';
import { Office } from '../../domain/entities/office.entity';
import { OfficeNumber } from '../../domain/value-objects/office-number.value-object';

describe('InMemoryOfficeRepository', () => {
  let repository: InMemoryOfficeRepository;

  beforeEach(() => {
    repository = new InMemoryOfficeRepository();
  });

  it('should save and find an Office by number', async () => {
    const office = Office.create(105, 24);
    await repository.save(office);
    const found = await repository.findByNumber(new OfficeNumber(105));
    expect(found).toBeDefined();
    expect(found?.number.getValue()).toBe(105);
  });

  it('should return null if no Office is found by number', async () => {
    const found = await repository.findByNumber(new OfficeNumber(999));
    expect(found).toBeNull();
  });

  it('should save and find an Office by id', async () => {
    const office = Office.create(106, 36);
    await repository.save(office);
    const found = await repository.findById(office.id);
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(office.id.getValue());
  });
});

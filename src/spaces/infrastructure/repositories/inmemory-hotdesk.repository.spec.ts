import { InMemoryHotDeskRepository } from './inmemory-hotdesk.repository';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { HotDeskNumber } from '../../domain/value-objects/hotdesk-number.value-object';

describe('InMemoryHotDeskRepository', () => {
  let repository: InMemoryHotDeskRepository;

  beforeEach(() => {
    repository = new InMemoryHotDeskRepository();
  });

  it('should save and find a HotDesk by number', async () => {
    const hotDesk = HotDesk.create(1);
    await repository.save(hotDesk);
    const found = await repository.findByNumber(new HotDeskNumber(1));
    expect(found).toBeDefined();
    expect(found?.number.getValue()).toBe(1);
  });

  it('should return null if no HotDesk is found by number', async () => {
    const found = await repository.findByNumber(new HotDeskNumber(99));
    expect(found).toBeNull();
  });

  it('should save and find a HotDesk by id', async () => {
    const hotDesk = HotDesk.create(2);
    await repository.save(hotDesk);
    const id = hotDesk.id;
    const found = await repository.findById(id);
    expect(found).toBeDefined();
    expect(found?.id.getValue()).toBe(id.getValue());
  });
});

import { RegisterHotDeskUseCase } from './register-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';

describe('RegisterHotDeskUseCase', () => {
  let repository: InMemoryHotDeskRepository;
  let useCase: RegisterHotDeskUseCase;

  beforeEach(() => {
    repository = new InMemoryHotDeskRepository();
    useCase = new RegisterHotDeskUseCase(repository);
  });

  it('should register a HotDesk with a valid number', async () => {
    const result = await useCase.execute({ number: 1 });
    expect(result.number.getValue()).toBe(1);
  });

  it('should throw a duplicate error when registering the same number', async () => {
    await useCase.execute({ number: 2 });
    await expect(useCase.execute({ number: 2 })).rejects.toThrow();
  });
});

import { RegisterHotDeskUseCase } from './register-hotdesk.use-case';
import { InMemoryHotDeskRepository } from '../../infrastructure/repositories/inmemory-hotdesk.repository';
import { RegisterHotDeskCommand } from '../commands/register-hotdesk.command';

describe('RegisterHotDeskUseCase', () => {
  let repository: InMemoryHotDeskRepository;
  let useCase: RegisterHotDeskUseCase;

  beforeEach(() => {
    repository = new InMemoryHotDeskRepository();
    useCase = new RegisterHotDeskUseCase(repository);
  });

  it('should register a HotDesk with a valid number', async () => {
    const command = new RegisterHotDeskCommand(1);
    const result = await useCase.execute(command);
    expect(result.number.getValue()).toBe(1);
  });

  it('should throw a duplicate error when registering the same number', async () => {
    const command = new RegisterHotDeskCommand(2);
    await useCase.execute(command);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});

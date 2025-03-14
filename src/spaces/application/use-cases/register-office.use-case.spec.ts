import { RegisterOfficeUseCase } from './register-office.use-case';
import { InMemoryOfficeRepository } from '../../infrastructure/repositories/inmemory-office.repository';
import { RegisterOfficeCommand } from '../commands/register-office.command';
import { DuplicateOfficeException } from '../../domain/exceptions/duplicate-office.exception';
import { InvalidOfficeLeasePeriodException } from '../../domain/exceptions/invalid-office-lease-period.exception';

describe('RegisterOfficeUseCase', () => {
  let repository: InMemoryOfficeRepository;
  let useCase: RegisterOfficeUseCase;

  beforeEach(() => {
    repository = new InMemoryOfficeRepository();
    useCase = new RegisterOfficeUseCase(repository);
  });

  it('should register an Office with valid data', async () => {
    const command = new RegisterOfficeCommand(101, 24, 'Active');
    const office = await useCase.execute(command);
    expect(office.number.getValue()).toBe(101);
    expect(office.leasePeriod.getValue()).toBe(24);
    expect(office.status.getValue()).toBe('Active');
  });

  it('should default leasePeriod to 12 and status to Active if not provided', async () => {
    const command = new RegisterOfficeCommand(102);
    const office = await useCase.execute(command);
    expect(office.leasePeriod.getValue()).toBe(12);
    expect(office.status.getValue()).toBe('Active');
  });

  it('should throw DuplicateOfficeException when trying to register an Office with an existing number', async () => {
    const command = new RegisterOfficeCommand(103, 24);
    await useCase.execute(command);
    await expect(useCase.execute(command)).rejects.toThrow(
      DuplicateOfficeException,
    );
  });

  it('should throw an error if leasePeriod is less than 12', async () => {
    const command = new RegisterOfficeCommand(104, 6);
    await expect(useCase.execute(command)).rejects.toThrow(
      InvalidOfficeLeasePeriodException,
    );
  });
});

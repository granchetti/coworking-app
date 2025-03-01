import { RegisterOfficeUseCase } from '../../application/use-cases/register-office.use-case';
import { InMemoryOfficeRepository } from '../../infrastructure/repositories/inmemory-office.repository';
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
    const office = await useCase.execute({
      number: 101,
      leasePeriod: 24,
      status: 'Active',
    });
    expect(office.number.getValue()).toBe(101);
    expect(office.leasePeriod.getValue()).toBe(24);
    expect(office.status.getValue()).toBe('Active');
  });

  it('should default leasePeriod to 12 and status to Active if not provided', async () => {
    const office = await useCase.execute({ number: 102 });
    expect(office.leasePeriod.getValue()).toBe(12);
    expect(office.status.getValue()).toBe('Active');
  });

  it('should throw DuplicateOfficeException when trying to register an Office with an existing number', async () => {
    await useCase.execute({ number: 103, leasePeriod: 24 });
    await expect(
      useCase.execute({ number: 103, leasePeriod: 24 }),
    ).rejects.toThrow(DuplicateOfficeException);
  });

  it('should throw an error if leasePeriod is less than 12', async () => {
    await expect(
      useCase.execute({ number: 104, leasePeriod: 6 }),
    ).rejects.toThrow(InvalidOfficeLeasePeriodException);
  });
});

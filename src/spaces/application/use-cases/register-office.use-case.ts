import { Office } from '../../domain/entities/office.entity';
import { IOfficeRepository } from '../../domain/repositories/office.repository.interface';
import { OfficeNumber } from '../../domain/value-objects/office-number.value-object';
import { DuplicateOfficeException } from '../../domain/exceptions/duplicate-office.exception';
import { InvalidOfficeLeasePeriodException } from '../../domain/exceptions/invalid-office-lease-period.exception';
import { RegisterOfficeCommand } from '../commands/register-office.command';

export class RegisterOfficeUseCase {
  constructor(private officeRepository: IOfficeRepository) {}

  public async execute(command: RegisterOfficeCommand): Promise<Office> {
    const { number, leasePeriod, status } = command;
    const officeNumber = new OfficeNumber(number);

    const existing = await this.officeRepository.findByNumber(officeNumber);
    if (existing) {
      throw new DuplicateOfficeException();
    }

    if (leasePeriod !== undefined && leasePeriod < 12) {
      throw new InvalidOfficeLeasePeriodException();
    }

    const office = Office.create(number, leasePeriod, status);
    await this.officeRepository.save(office);
    return office;
  }
}

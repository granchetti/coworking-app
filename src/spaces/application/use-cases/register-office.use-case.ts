import { Office } from '../../domain/entities/office.entity';
import { IOfficeRepository } from '../../domain/repositories/office.repository.interface';
import { OfficeNumber } from '../../domain/value-objects/office/office-number.value-object';
import { DuplicateOfficeException } from '../../domain/exceptions/duplicate-office.exception';
import { StatusType } from '../../domain/value-objects/shared/status.value-object';

export class RegisterOfficeUseCase {
  constructor(private officeRepository: IOfficeRepository) {}

  public async execute(input: {
    number: number;
    leasePeriod?: number;
    status?: StatusType;
  }): Promise<Office> {
    const officeNumber = new OfficeNumber(input.number);

    const existing = await this.officeRepository.findByNumber(officeNumber);
    if (existing) {
      throw new DuplicateOfficeException();
    }

    const office = Office.create(input.number, input.leasePeriod, input.status);
    await this.officeRepository.save(office);
    return office;
  }
}

import { DuplicateHotDeskException } from '../../domain/exceptions/duplicate-hotdesk.exception';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { IHotDeskRepository } from '../../domain/repositories/hotdesk.repository.interface';
import { HotDeskNumber } from '../../domain/value-objects/hotdesk-number.value-object';
import { RegisterHotDeskCommand } from '../commands/register-hotdesk.command';

export class RegisterHotDeskUseCase {
  constructor(private hotDeskRepository: IHotDeskRepository) {}

  public async execute(command: RegisterHotDeskCommand): Promise<HotDesk> {
    const { number } = command;

    const hotDeskNumber = new HotDeskNumber(number);
    const existing = await this.hotDeskRepository.findByNumber(hotDeskNumber);
    if (existing) {
      throw new DuplicateHotDeskException();
    }

    const hotDesk = HotDesk.create(number);
    await this.hotDeskRepository.save(hotDesk);
    return hotDesk;
  }
}

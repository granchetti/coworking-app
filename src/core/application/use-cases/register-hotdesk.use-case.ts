import { DuplicateHotDeskException } from '../../domain/exceptions/duplicate-hotdesk.exception';
import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { IHotDeskRepository } from '../../domain/repositories/hotdesk.repository.interface';
import { HotDeskNumber } from '../../domain/value_objects/hotdesk-number.value-object';

export class RegisterHotDeskUseCase {
  constructor(private hotDeskRepository: IHotDeskRepository) {}

  public async execute(input: { number: number }): Promise<HotDesk> {
    const { number } = input;

    const hotDeskNumber = new HotDeskNumber(input.number);
    const existing = await this.hotDeskRepository.findByNumber(hotDeskNumber);
    if (existing) {
      throw new DuplicateHotDeskException();
    }

    const hotDesk = HotDesk.create(number);
    await this.hotDeskRepository.save(hotDesk);
    return hotDesk;
  }
}

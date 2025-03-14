import { StatusType } from '../../domain/value-objects/shared/status.value-object';

export class RegisterOfficeCommand {
  constructor(
    public readonly number: number,
    public readonly leasePeriod?: number,
    public readonly status?: StatusType,
  ) {}
}

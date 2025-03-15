import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class RegisterPackageCommand {
  constructor(
    public readonly membershipId: Uuid,
    public readonly credits: number,
    public readonly year: number,
    public readonly month: number,
  ) {}
}

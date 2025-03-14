import { Uuid } from '../../../common/value-objects/entity-id.value-object';

export class CreateMembershipCommand {
  constructor(public readonly userId: Uuid) {}
}

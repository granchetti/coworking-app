export class DuplicateMembershipException extends Error {
  constructor() {
    super('A membership for this user already exists');
    this.name = 'DuplicateMembershipException';
  }
}

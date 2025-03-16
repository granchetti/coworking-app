import { DuplicateMembershipException } from './duplicate-membership.exception';

describe('DuplicateMembershipException', () => {
  it('should have the correct message and name', () => {
    const exception = new DuplicateMembershipException();
    expect(exception.message).toBe('A membership for this user already exists');
    expect(exception.name).toBe('DuplicateMembershipException');
  });
});

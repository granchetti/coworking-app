import { Uuid } from './entity-id.value-object';

describe('Uuid Value Object', () => {
  it('should generate a valid UUID if not provided', () => {
    const uuid = new Uuid();
    expect(uuid.getValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  it('should accept a valid UUID', () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000';
    const uuid = new Uuid(validUuid);
    expect(uuid.getValue()).toBe(validUuid);
  });

  it('should throw an error if an invalid UUID is provided', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow('Invalid UUID');
  });
});

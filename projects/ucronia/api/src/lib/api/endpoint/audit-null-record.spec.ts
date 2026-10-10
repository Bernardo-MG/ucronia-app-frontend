import { mapAudit } from './audit-endpoint-utils';

describe('Audit mapping for absent linked profiles', () => {
  it('preserves a null record', () => {
    expect(mapAudit(null)).toBeNull();
  });

  it('preserves an undefined record', () => {
    expect(mapAudit(undefined)).toBeUndefined();
  });

  it('preserves an audit whose fields are all null', () => {
    const record = { audit: { createdAt: null, createdBy: null, updatedAt: null, updatedBy: null } };
    expect(mapAudit(record)).toBe(record);
    expect(record.audit).toEqual({ createdAt: null, createdBy: null, updatedAt: null, updatedBy: null });
  });
});

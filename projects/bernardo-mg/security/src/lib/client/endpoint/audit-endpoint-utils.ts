import { AuditDetails, User } from '@bernardo-mg/authentication';

export function mapAudit<T extends { audit?: AuditDetails | null } | null | undefined>(record: T): T {
  if (record == null) return record;
  if (record.audit?.createdAt != null) {
    record.audit.createdAt = new Date(record.audit.createdAt);
  }
  if (record.audit?.updatedAt != null) {
    record.audit.updatedAt = new Date(record.audit.updatedAt);
  }
  return record;
}

export function mapUserAudit<T extends User | null | undefined>(user: T): T {
  mapAudit(user);
  user?.roles?.forEach(role => mapAudit(role));
  return user;
}

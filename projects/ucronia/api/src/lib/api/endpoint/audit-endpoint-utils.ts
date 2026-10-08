import { AuditDetails } from '@ucronia/domain';

/** Normalize audit dates without replacing the record or its audit users. */
export function mapAudit<T extends { audit?: AuditDetails | null }>(record: T): T {
  if (record.audit?.createdAt != null) {
    record.audit.createdAt = new Date(record.audit.createdAt);
  }
  if (record.audit?.updatedAt != null) {
    record.audit.updatedAt = new Date(record.audit.updatedAt);
  }
  return record;
}

export function mapAuditPage<T extends { audit?: AuditDetails | null }, P extends { content: T[] }>(page: P): P {
  page.content.forEach(record => mapAudit(record));
  return page;
}

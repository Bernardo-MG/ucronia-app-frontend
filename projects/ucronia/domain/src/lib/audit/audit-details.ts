/** Audit metadata returned by the backend. API endpoints normalize timestamps to Date objects. */
export class AuditDetails {
  public createdAt?: Date | null;
  public updatedAt?: Date | null;
  public createdBy?: AuditUser | null;
  public updatedBy?: AuditUser | null;
}

export class AuditUser {
  public email?: string | null;
  public username?: string | null;
  public name?: string | null;
}

import { AuditDetails } from "../audit/audit-details";

export class Setting {
  public code = '';
  public value = '';
  public type = '';
  public audit?: AuditDetails;
}

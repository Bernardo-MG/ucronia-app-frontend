import { AuditDetails } from "../audit/audit-details";

export class Transaction {
  public index = 0;
  public description = '';
  public date = new Date();
  public amount = 0;
  public audit?: AuditDetails;
}

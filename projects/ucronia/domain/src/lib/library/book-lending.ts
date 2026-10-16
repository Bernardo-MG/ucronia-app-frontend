import { AuditDetails } from "../audit/audit-details";
import { LentBook } from "./lent-book";

export class BookLending {
  public book = new LentBook();
  public borrower = 0;
  public lendingDate = new Date();
  public returnDate: Date | undefined;
  public days = 0;
  public audit?: AuditDetails;
}

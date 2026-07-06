import { LentBook } from "./lent-book";

export class BookLending {
  public book = new LentBook();
  public borrower = 0;
  public lendingDate = new Date();
  public returnDate: Date | undefined;
  public days = 0;
}

import { ProfileName } from "@bernardo-mg/security";
import { LentBook } from "./lent-book";


export class BookLending {
  public book = new LentBook();
  public borrower = new Borrower();
  public lendingDate = new Date();
  public returnDate = new Date();
  public days = 0;
}

export class Borrower {
  public number = -1;
  public name = new ProfileName();
}

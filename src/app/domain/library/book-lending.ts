import { Borrower } from "./borrower";
import { LentBook } from "./lent-book";


export class BookLending {
  book = new LentBook();
  borrower = new Borrower();
  lendingDate = '';
  returnDate = '';
  days = 0;
}

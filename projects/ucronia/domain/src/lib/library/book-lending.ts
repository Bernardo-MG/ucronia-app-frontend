import { ContactName } from "../contacts/contact-name";
import { LentBook } from "./lent-book";


export class BookLending {
  book = new LentBook();
  borrower = new Borrower();
  lendingDate = new Date();
  returnDate = new Date();
  days = 0;
}

export class Borrower {
  number = -1;
  name = new ContactName();
}

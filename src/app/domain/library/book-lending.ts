import { Member } from "../members/member";
import { LentBook } from "./lent-book";


export class BookLending {
  book = new LentBook();
  borrower = new Member();
  lendingDate = new Date();
  returnDate = new Date();
  days = 0;
}

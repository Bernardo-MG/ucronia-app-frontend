import { Title } from "@app/domain/library/title";
import { BookLending } from "./book-lending";

export class BookInfo {
  number = -1;
  title = new Title();
  isbn = '';
  language = '';
  lent = false;
  lendings: BookLending[] = [];
}

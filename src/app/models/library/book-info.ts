import { Title } from "@app/models/library/title";
import { BookLending } from "./book-lending";

export class BookInfo {
  number = -1;
  title = new Title();
  isbn = '';
  language = '';
  lent = false;
  lendings: BookLending[] = [];
}

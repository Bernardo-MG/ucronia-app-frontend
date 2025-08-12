import { Title } from "@app/models/library/title";
import { Author } from "./author";
import { BookLending } from "./book-lending";
import { Donation } from "./donation";
import { Publisher } from "./publisher";

export class BookInfo {
  number = -1;
  title = new Title();
  lent = false;
  isbn = '';
  language = '';
  publishDate = '';
  authors: Author[] = [];
  lendings: BookLending[] = [];
  publishers: Publisher[] = [];
  donation: Donation | undefined;
}

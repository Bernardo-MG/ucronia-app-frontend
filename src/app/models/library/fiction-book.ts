import { Author } from "./author";
import { BookLending } from "./book-lending";
import { Donation } from "./donation";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class FictionBook {
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

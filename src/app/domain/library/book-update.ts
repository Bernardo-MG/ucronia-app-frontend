import { BookLending } from "./book-lending";
import { Donation } from "./donation";
import { Title } from "./title";

export class BookUpdate {
  number = -1;
  title = new Title();
  lent = false;
  isbn = '';
  language = '';
  publishDate = '';
  authors: number[] = [];
  lendings: BookLending[] = [];
  publishers: number[] = [];
  donation: Donation | undefined;
  bookType: number | undefined;
  gameSystem: number | undefined;
}

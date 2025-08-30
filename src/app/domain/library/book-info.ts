import { Author } from "./author";
import { Title } from "@app/domain/library/title";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { Donation } from "./donation";
import { GameSystem } from "./game-system";
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

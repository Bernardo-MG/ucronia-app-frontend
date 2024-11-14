import { Author } from "./author";
import { BookDonation } from "./book-donation";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class Book {
  number = -1;
  title = new Title();
  lent = false;
  isbn = '';
  language = '';
  publishDate = '';
  authors: Author[] = [];
  lendings: BookLending[] = [];
  publishers: Publisher[] = [];
  donation = new BookDonation();
  bookType = new BookType();
  gameSystem = new GameSystem();
}

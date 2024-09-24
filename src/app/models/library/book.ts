import { Author } from "./author";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Person } from "./person";
import { Publisher } from "./publisher";

export class Book {
  number = -1;
  title = '';
  lent = false;
  isbn = '';
  language = '';
  authors: Author[] = [];
  donors: Person[] = [];
  lendings: BookLending[] = [];
  publishers: Publisher[] = [];
  bookType = new BookType();
  gameSystem = new GameSystem();
}

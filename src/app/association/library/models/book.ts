import { Author } from "./author";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";

export class Book {
  title = '';
  isbn = '';
  language = '';
  authors: Author[] = [];
  bookType = new BookType();
  gameSyste = new GameSystem();
}

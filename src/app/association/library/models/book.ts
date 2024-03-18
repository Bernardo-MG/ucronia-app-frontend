import { Author } from "./author";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";

export class Book {
  index = -1;
  title = '';
  isbn = '';
  language = '';
  authors: Author[] = [];
  bookType = new BookType();
  gameSystem = new GameSystem();
}

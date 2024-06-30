import { Author } from "./author";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Person } from "./person";
import { Publisher } from "./publisher";

export class Book {
  number = -1;
  title = '';
  isbn = '';
  language = '';
  authors: Author[] = [];
  donors: Person[] = [];
  lendings: BookLending[] = [];
  publisher = new Publisher();
  bookType = new BookType();
  gameSystem = new GameSystem();
}

import { Author } from "./author";
import { BookType } from "./book-type";
import { Donor } from "./donor";
import { GameSystem } from "./game-system";
import { Publisher } from "./publisher";

export class Book {
  number = -1;
  title = '';
  isbn = '';
  language = '';
  authors: Author[] = [];
  publisher = new Publisher();
  bookType = new BookType();
  gameSystem = new GameSystem();
  donor = new Donor();
}

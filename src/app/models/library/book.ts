import { Person } from "../person/person";
import { Author } from "./author";
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
  donationDate = '';
  authors: Author[] = [];
  donors: Person[] = [];
  lendings: BookLending[] = [];
  publishers: Publisher[] = [];
  bookType = new BookType();
  gameSystem = new GameSystem();
}

import { Author } from "./author";
import { Donation } from "./donation";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class GameBook {
  number = -1;
  title = new Title();
  lent = false;
  isbn = '';
  language = '';
  publishDate = new Date();
  authors: Author[] = [];
  lendings: BookLending[] = [];
  publishers: Publisher[] = [];
  donation: Donation | undefined;
  bookType: BookType | undefined;
  gameSystem: GameSystem | undefined;
}

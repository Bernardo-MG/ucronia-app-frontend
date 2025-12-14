import { Author } from "./author";
import { Donation } from "./donation";
import { BookLending } from "./book-lending";
import { BookType } from "./book-type";
import { GameSystem } from "./game-system";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class GameBook {
  public number = -1;
  public title = new Title();
  public lent = false;
  public isbn = '';
  public language = '';
  public publishDate = new Date();
  public authors: Author[] = [];
  public lendings: BookLending[] = [];
  public publishers: Publisher[] = [];
  public donation: Donation | undefined;
  public bookType: BookType | undefined;
  public gameSystem: GameSystem | undefined;
}

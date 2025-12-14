import { Author } from "./author";
import { BookLending } from "./book-lending";
import { Donation } from "./donation";
import { Publisher } from "./publisher";
import { Title } from "./title";

export class BookInfo {
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
}

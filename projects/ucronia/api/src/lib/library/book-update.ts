import { BookLending, Donation, Title } from "@ucronia/domain";

export class BookUpdate {
  public number = -1;
  public title = new Title();
  public lent = false;
  public isbn = '';
  public language = '';
  public publishDate = new Date();
  public authors: number[] = [];
  public lendings: BookLending[] = [];
  public publishers: number[] = [];
  public donation: Donation | undefined;
  public bookType: number | undefined;
  public gameSystem: number | undefined;
}

import { Donation, Title } from "@ucronia/domain";

export class FictionBookUpdate {
  public title = new Title();
  public isbn = '';
  public language = '';
  public publishDate = new Date();
  public authors: number[] = [];
  public publishers: number[] = [];
  public donation: Donation | undefined;
}

import { Title } from "@ucronia/domain";

export class GameBookUpdate {
  public title = new Title();
  public isbn = '';
  public language = '';
  public publishDate = new Date();
  public authors: number[] = [];
  public publishers: number[] = [];
  public bookType: number | undefined;
  public gameSystem: number | undefined;
}

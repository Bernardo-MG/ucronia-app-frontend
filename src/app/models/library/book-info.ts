import { Title } from "@app/models/library/title";

export class BookInfo {
  number = -1;
  title = new Title();
  isbn = '';
  language = '';
  lent = false;
}

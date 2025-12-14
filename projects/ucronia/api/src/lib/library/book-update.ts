import { BookLending } from "@ucronia/domain";
import { Donation } from "@ucronia/domain";
import { Title } from "@ucronia/domain";

export class BookUpdate {
  number = -1;
  title = new Title();
  lent = false;
  isbn = '';
  language = '';
  publishDate = new Date();
  authors: number[] = [];
  lendings: BookLending[] = [];
  publishers: number[] = [];
  donation: Donation | undefined;
  bookType: number | undefined;
  gameSystem: number | undefined;
}

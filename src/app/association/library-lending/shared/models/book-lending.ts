import { Person } from "@app/association/library/models/person";

export class BookLending {
  number = -1;
  person = new Person();
  lendingDate = '';
  returnDate = '';
}

import { PublicPerson } from "../person/public-person";

export class Fee {
  month = '';
  paid = false;
  transaction = new FeeTransaction();
  person = new PublicPerson();
}

export class FeeTransaction {
  date = '';
  index = -1;
}

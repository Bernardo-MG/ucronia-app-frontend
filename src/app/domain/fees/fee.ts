import { PublicPerson } from "../person/public-person";

export class Fee {
  month = '';
  paid = false;
  transaction: FeeTransaction | undefined;
  member = new PublicPerson();
}

export class FeeTransaction {
  date = '';
  index = -1;
}

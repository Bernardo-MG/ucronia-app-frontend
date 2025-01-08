import { PublicPerson } from "../person/public-person";

export class Fee {
  month = '';
  paid = false;
  payment: FeeTransaction | undefined;
  person = new PublicPerson();
}

export class FeeTransaction {
  date = '';
  index = -1;
}

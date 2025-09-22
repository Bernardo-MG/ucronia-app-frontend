import { PublicPerson } from "../person/public-person";

export class Fee {
  month = new Date();
  paid = false;
  transaction: FeeTransaction | undefined;
  member = new PublicPerson();
}

export class FeeTransaction {
  date: Date | undefined;
  index = -1;
}

import { PublicPerson } from "../person/public-person";
import { FeeTransaction } from "./fee-transaction";

export class Fee {
  date = '';
  paid = false;
  transaction = new FeeTransaction();
  person = new PublicPerson();
}

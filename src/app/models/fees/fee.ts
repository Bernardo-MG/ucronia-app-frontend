import { PublicPerson } from "../person/public-person";
import { FeeTransaction } from "./fee-transaction";

export class Fee {
  month = '';
  paid = false;
  transaction = new FeeTransaction();
  person = new PublicPerson();
}

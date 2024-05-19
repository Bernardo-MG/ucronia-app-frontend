import { FeePerson } from "./fee-member";
import { FeeTransaction } from "./fee-transaction";

export class Fee {
  date = '';
  paid = false;
  transaction = new FeeTransaction();
  person = new FeePerson();
}

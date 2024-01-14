import { FeeMember } from "./fee-member";
import { FeeTransaction } from "./fee-transaction";

export class Fee {
  date = '';
  paid = false;
  transaction = new FeeTransaction();
  member = new FeeMember();
}

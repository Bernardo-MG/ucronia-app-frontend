import { PublicMember } from "../contact/public-member";

export class Fee {
  month = new Date();
  paid = false;
  transaction: FeeTransaction | undefined;
  member = new PublicMember();
}

export class FeeTransaction {
  date: Date | undefined;
  index = -1;
}

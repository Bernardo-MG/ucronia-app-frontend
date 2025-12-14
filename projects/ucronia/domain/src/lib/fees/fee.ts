import { ContactName } from "../contacts/contact-name";

export class Fee {
  month = new Date();
  paid = false;
  transaction: FeeTransaction | undefined;
  member = new FeeMember();
}

export class FeeTransaction {
  date: Date | undefined;
  index = -1;
}

export class FeeMember {
  number = -1;
  name = new ContactName();
}

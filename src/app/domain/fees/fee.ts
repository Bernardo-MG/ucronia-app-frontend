import { ContactName } from "../contact/contact-name";

export class Fee {
  month = new Date();
  paid = false;
  transaction: FeeTransaction | undefined;
  member = new Member();
}

export class FeeTransaction {
  date: Date | undefined;
  index = -1;
}

export class Member {
  number = -1;
  name = new ContactName();
}

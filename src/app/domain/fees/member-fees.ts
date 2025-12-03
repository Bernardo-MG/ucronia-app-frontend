import { ContactName } from "../contact/contact-name";

export class MemberFees {
  member = new Member();
  fees: Fee[] = [];
}

export class Fee {
  month = new Date();
  paid = false;
}

export class Member {
  number = -1;
  name = new ContactName();
  active = false;
}
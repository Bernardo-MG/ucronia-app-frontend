import { ContactName } from "../contacts/contact-name";

export class MemberFees {
  member = new MemberFeesMember();
  fees: MemberFeesFee[] = [];
}

export class MemberFeesFee {
  month = new Date();
  paid = false;
}

export class MemberFeesMember {
  number = -1;
  name = new ContactName();
  active = false;
}
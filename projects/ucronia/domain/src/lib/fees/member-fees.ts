import { ContactName } from "../contacts/contact-name";

export class MemberFees {
  public member = new MemberFeesMember();
  public fees: MemberFeesFee[] = [];
}

export class MemberFeesFee {
  public month = new Date();
  public paid = false;
}

export class MemberFeesMember {
  public number = -1;
  public name = new ContactName();
  public active = false;
}
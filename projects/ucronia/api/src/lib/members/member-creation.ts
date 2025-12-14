import { ContactName } from "@ucronia/domain";

export class MemberCreation {
  identifier = '';
  name = new ContactName();
  member = false;
  active = false;
}

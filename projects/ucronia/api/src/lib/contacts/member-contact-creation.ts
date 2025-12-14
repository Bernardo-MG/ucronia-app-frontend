import { ContactName } from "@ucronia/domain";

export class MemberContactCreation {
  identifier = '';
  name = new ContactName();
  member = false;
  active = false;
}

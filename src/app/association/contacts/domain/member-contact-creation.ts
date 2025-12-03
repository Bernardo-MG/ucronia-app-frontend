import { ContactName } from "../../../domain/contact/contact-name";

export class MemberContactCreation {
  identifier = '';
  name = new ContactName();
  member = false;
  active = false;
}

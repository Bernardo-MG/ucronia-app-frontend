import { ContactName } from "../../../domain/contact/contact-name";

export class MemberCreation {
  identifier = '';
  name = new ContactName();
  member = false;
  active = false;
}

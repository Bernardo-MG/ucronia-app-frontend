import { ContactName } from "../../../domain/contact/contact-name";

export class MemberContact {
  number = -1;
  identifier = '';
  birthDate = new Date();
  name = new ContactName();
  active = false;
  renew = false;
}

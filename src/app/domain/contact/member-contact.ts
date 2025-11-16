import { ContactName } from "./contact-name";

export class MemberContact {
  number = -1;
  identifier = '';
  phone = '';
  birthDate = new Date();
  name = new ContactName();
  active = false;
  renew = false;
}

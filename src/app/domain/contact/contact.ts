import { Membership } from "./membership";
import { ContactName } from "./contact-name";

export class Contact {
  number = -1;
  identifier = '';
  phone = '';
  birthDate = new Date();
  name = new ContactName();
  membership: Membership | undefined = undefined;
}

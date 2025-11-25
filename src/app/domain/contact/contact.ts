import { ContactName } from "./contact-name";

export class Contact {
  number = -1;
  identifier = '';
  birthDate = new Date();
  name = new ContactName();
}

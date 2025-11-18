import { ContactName } from "../../../domain/contact/contact-name";

export class ContactCreation {
  identifier = '';
  name = new ContactName();
  member = false;
}

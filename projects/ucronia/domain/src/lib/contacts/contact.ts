import { ContactMethod } from "./contact-method";
import { ContactName } from "./contact-name";

export class Contact {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ContactName();
  public contactChannels: ContactChannel[] = [];
  public comments = '';
}

export class ContactChannel {
  public method = new ContactMethod();
  public detail = '';
}
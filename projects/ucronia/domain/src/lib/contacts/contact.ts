import { ContactName } from "./contact-name";

export class Contact {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ContactName();
  public comments = '';
}

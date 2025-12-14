import { ContactName } from "../contacts/contact-name";

export class MemberContact {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ContactName();
  public comments = '';
  public active = false;
  public renew = false;
}

import { ContactName } from "../contact/contact-name";

export class Member {
  public number = -1;
  public name = new ContactName();
  public active = false;
  public renew = false;
}

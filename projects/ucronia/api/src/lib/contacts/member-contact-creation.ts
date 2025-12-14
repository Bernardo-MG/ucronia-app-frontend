import { ContactName } from "@ucronia/domain";

export class MemberContactCreation {
  public identifier = '';
  public name = new ContactName();
  public member = false;
  public active = false;
}

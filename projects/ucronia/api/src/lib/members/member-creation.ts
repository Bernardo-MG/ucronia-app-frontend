import { ContactName } from "@ucronia/domain";

export class MemberCreation {
  public identifier = '';
  public name = new ContactName();
  public member = false;
  public active = false;
}

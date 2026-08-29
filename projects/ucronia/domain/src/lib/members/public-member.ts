import { MemberName } from "./member";

export class PublicMember {
  public number = -1;
  public name = new MemberName();
  public key?: number;
  public renew = true;
}

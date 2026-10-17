import { MemberName } from "./member";

export class PublicMember {
  // TODO: shouldn't be optional
  public memberNumber?: number | null;
  public name = new MemberName();
  public key?: number;
  public renew = true;
}

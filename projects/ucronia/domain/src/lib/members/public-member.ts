import { MemberName } from "./member";

export class PublicMember {
  public number = -1;
  // TODO: shouldn't be optional
  public memberNumber?: number | null;
  public name = new MemberName();
  public renew = true;
}

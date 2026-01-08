import { ProfileName } from "../profiles/profile-name";

export class Member {
  public number = -1;
  public name = new ProfileName();
  public feeType = new MemberFeeType();
  public active = false;
  public renew = false;
}

export class MemberFeeType {
  public number = -1;
}

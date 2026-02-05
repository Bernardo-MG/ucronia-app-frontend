import { ProfileName } from "../profile/profile-name";

export class MemberFees {
  public member = new MemberFeesMember();
  public fees: MemberFeesFee[] = [];
}

export class MemberFeesFee {
  public month = new Date();
  public paid = false;
}

export class MemberFeesMember {
  public number = -1;
  public name = new ProfileName();
  public active = false;
}
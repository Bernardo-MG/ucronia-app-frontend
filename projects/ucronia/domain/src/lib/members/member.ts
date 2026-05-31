import { ContactChannel } from "../profile/profile";
import { ProfileName } from "../profile/profile-name";

export class Member {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileName();
  public contactChannels: ContactChannel[] = [];
  public address = '';
  public comments = '';
  public types: string[] = [];
  public feeType = new MemberFeeType();
  public active = false;
  public renew = false;
}

export class MemberFeeType {
  public number = 0;
  public name = '';
  public amount = 0;
}

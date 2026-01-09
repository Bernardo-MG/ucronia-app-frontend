import { ContactChannel } from "../profiles/profile";
import { ProfileName } from "../profiles/profile-name";

export class MemberProfile {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileName();
  public contactChannels: ContactChannel[] = [];
  public comments = '';
  public types: string[] = [];
  public feeType = new MemberProfileFeeType();
  public active = false;
  public renew = false;
}

export class MemberProfileFeeType {
  public number = 0;
}
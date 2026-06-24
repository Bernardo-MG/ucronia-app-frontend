import { ContactChannel } from "../profile/profile";

export class Member {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new MemberName();
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

export class MemberName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

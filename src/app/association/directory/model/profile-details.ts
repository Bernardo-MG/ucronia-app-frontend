export class ProfileDetails {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileDetailsName();
  public contactChannels: ProfileDetailsChannel[] = [];
  public games?: Date[] = [];
  public years?: number[] = [];
  public types: string[] = [];
  public address = '';
  public comments = '';
  public feeType? = new ProfileDetailsFeeType();
  public active? = false;
  public renew? = false;
}

export class ProfileDetailsChannel {
  public method = new ProfileDetailsMethod();
  public detail = '';
}

export class ProfileDetailsName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

export class ProfileDetailsMethod {
  public number = -1;
  public name = '';
}

export class ProfileDetailsFeeType {
  public number = 0;
  public name = '';
  public amount = 0;
}

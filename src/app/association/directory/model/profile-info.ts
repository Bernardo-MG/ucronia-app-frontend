export class ProfileInfo {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileInfoName();
  public contactChannels: ProfileInfoChannel[] = [];
  public games?: Date[] = [];
  public years?: number[] = [];
  public types: string[] = [];
  public address = '';
  public comments = '';
  public feeType? = -1;
  public active? = false;
  public renew? = false;
}

export class ProfileInfoChannel {
  public method = new ProfileInfoMethod();
  public detail = '';
}

export class ProfileInfoName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

export class ProfileInfoMethod {
  public number = -1;
  public name = '';
}

export class FullProfile {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new FullProfileName();
  public contactChannels: FullProfileChannel[] = [];
  public games?: Date[] = [];
  public years?: number[] = [];
  public types: string[] = [];
  public address = '';
  public comments = '';
  public feeType? = new FullProfileFeeType();
  public active? = false;
  public renew? = false;
}

export class FullProfileChannel {
  public method = new FullProfileContactMethod();
  public detail = '';
}

export class FullProfileName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

export class FullProfileContactMethod {
  public number = -1;
  public name = '';
}

export class FullProfileFeeType {
  public number = 0;
  public name = '';
  public amount = 0;
}

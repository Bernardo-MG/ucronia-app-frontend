export class ContactInfo {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ContactInfoName();
  public contactChannels: ContactInfoChannel[] = [];
  public games?: Date[] = [];
  public years?: number[] = [];
  public types: string[] = [];
  public comments = '';
  public active? = false;
  public renew? = false;
}

export class ContactInfoChannel {
  public method = new ContactInfoMethod();
  public detail = '';
}

export class ContactInfoName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

export class ContactInfoMethod {
  public number = -1;
  public name = '';
}
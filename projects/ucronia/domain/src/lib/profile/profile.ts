import { ContactMethod } from "./contact-method";

export class Profile {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileName();
  public contactChannels: ContactChannel[] = [];
  public address = '';
  public comments = '';
  public types: string[] = [];
}

export class ContactChannel {
  public method = new ContactMethod();
  public detail = '';
}

export class ProfileName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

import { ContactChannel } from "../profile/profile";

export class Sponsor {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new SponsorName();
  public contactChannels: ContactChannel[] = [];
  public years: number[] = [];
  public address = '';
  public comments = '';
  public types: string[] = [];
}

export class SponsorName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

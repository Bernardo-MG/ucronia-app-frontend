import { ContactChannel } from "../profiles/profile";
import { ProfileName } from "../profiles/profile-name";

export class Sponsor {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new ProfileName();
  public contactChannels: ContactChannel[] = [];
  public years: number[] = [];
  public address = '';
  public comments = '';
  public types: string[] = [];
}

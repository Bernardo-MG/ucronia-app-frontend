import { ContactChannel } from "../profile/profile";

export class Guest {
  public number = -1;
  public identifier = '';
  public birthDate = new Date();
  public name = new GuestName();
  public contactChannels: ContactChannel[] = [];
  public games: Date[] = [];
  public address = '';
  public comments = '';
  public types: string[] = [];
}

export class GuestName {
  public fullName = '';
  public firstName = '';
  public lastName = '';
}

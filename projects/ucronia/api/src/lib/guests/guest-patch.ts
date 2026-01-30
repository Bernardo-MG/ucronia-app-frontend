import { ProfileName, ProfilePatchChannel } from "@bernardo-mg/security";

export class GuestPatch {
  public identifier?: string;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public games?: Date[] = [];
  public address?: string;
  public comments?: string;
}

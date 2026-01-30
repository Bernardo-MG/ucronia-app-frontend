import { ProfileName, ProfilePatchChannel } from "@bernardo-mg/security";

export class SponsorPatch {
  public identifier?: string;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public years?: number[] = [];
  public address?: string;
  public comments?: string;
}

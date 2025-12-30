import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profiles/profile-patch-channel";

export class SponsorPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ProfileName;
  public contactChannels?: ProfilePatchChannel[] = [];
  public years?: number[] = [];
  public comments?: string;
}

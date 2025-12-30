import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "./profile-patch-channel";

export class ProfilePatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ProfileName;
  public contactChannels?: ProfilePatchChannel[] = [];
  public comments?: string;
}

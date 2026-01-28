import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "./profile-patch-channel";

export class ProfilePatch {
  public identifier?: string;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public address?: string;
  public comments?: string;
}

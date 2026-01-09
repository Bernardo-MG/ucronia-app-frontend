import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profiles/profile-patch-channel";

export class MemberProfilePatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ProfileName;
  public contactChannels?: ProfilePatchChannel[] = [];
  public feeType = 0;
  public active? = false;
  public renew? = false;
  public comments?: string;
}

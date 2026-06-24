import { MemberName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profile/profile-patch";

export class MemberPatch {
  public identifier?: string;
  public feeType = 0;
  public name?: MemberName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public address?: string;
  public comments?: string;
  public active? = false;
  public renew? = false;
}

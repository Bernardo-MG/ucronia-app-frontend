import { ProfileName, ProfilePatchChannel } from "@bernardo-mg/security";

export class MemberProfilePatch {
  public identifier?: string;
  public feeType = 0;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public address?: string;
  public comments?: string;
  public active? = false;
  public renew? = false;
}

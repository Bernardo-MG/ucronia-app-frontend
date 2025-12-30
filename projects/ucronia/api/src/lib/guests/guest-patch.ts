import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profiles/profile-patch-channel";

export class GuestPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ProfileName;
  public contactChannels?: ProfilePatchChannel[] = [];
  public games?: Date[] = [];
  public comments?: string;
}

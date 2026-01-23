import { ProfileName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profiles/profile-patch-channel";

export class GuestPatch {
  public identifier?: string;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public games?: Date[] = [];
  public address?: string;
  public comments?: string;
}

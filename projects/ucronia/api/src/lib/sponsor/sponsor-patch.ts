import { SponsorName } from "@ucronia/domain";
import { ProfilePatchChannel } from "../profile/profile-patch";

export class SponsorPatch {
  public identifier?: string;
  public name?: SponsorName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public years?: number[] = [];
  public address?: string;
  public comments?: string;
}

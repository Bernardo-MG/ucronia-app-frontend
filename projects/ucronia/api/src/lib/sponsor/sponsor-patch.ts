import { ContactName } from "@ucronia/domain";
import { ContactPatchChannel } from "../contacts/contact-patch-channel";

export class SponsorPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ContactName;
  public contactChannels?: ContactPatchChannel[] = [];
  public years?: number[] = [];
  public comments?: string;
}

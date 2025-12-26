import { ContactName } from "@ucronia/domain";
import { ContactPatchChannel } from "../contacts/contact-patch-channel";

export class MemberContactPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ContactName;
  public contactChannels?: ContactPatchChannel[] = [];
  public active? = false;
  public renew? = false;
  public comments?: string;
}

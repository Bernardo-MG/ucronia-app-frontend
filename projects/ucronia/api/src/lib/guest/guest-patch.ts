import { ContactName } from "@ucronia/domain";
import { ContactPatchChannel } from "../contacts/contact-patch-channel";

export class GuestPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ContactName;
  public contactChannels?: ContactPatchChannel[] = [];
  public games?: Date[] = [];
  public comments?: string;
}

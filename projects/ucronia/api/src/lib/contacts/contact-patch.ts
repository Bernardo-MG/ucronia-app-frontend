import { ContactChannel, ContactName } from "@ucronia/domain";

export class ContactPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ContactName;
  public contactChannels: ContactPatchChannel[] = [];
  public comments?: string;
}

export class ContactPatchChannel {
  public method = -1;
  public detail = '';
}
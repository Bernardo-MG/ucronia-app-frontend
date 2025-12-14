import { ContactName } from "@ucronia/domain";

export class ContactPatch {
  public number = -1;
  public identifier?: string;
  public birthDate?: Date;
  public name?: ContactName;
  public comments?: string;
}

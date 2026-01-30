import { ProfileName } from "../domain/profile-name";

export class ProfilePatch {
  public identifier?: string;
  public name?: ProfileName;
  public birthDate?: Date;
  public contactChannels?: ProfilePatchChannel[] = [];
  public address?: string;
  public comments?: string;
}

export class ProfilePatchChannel {
  public method = -1;
  public detail = '';
}
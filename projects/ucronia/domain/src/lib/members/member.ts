import { ProfileName } from "../profiles/profile-name";

export class Member {
  public number = -1;
  public name = new ProfileName();
  public active = false;
  public renew = false;
}

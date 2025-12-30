import { ProfileName } from "../profiles/profile-name";

export class Fee {
  public month = new Date();
  public paid = false;
  public transaction: FeeTransaction | undefined;
  public member = new FeeMember();
}

export class FeeTransaction {
  public date: Date | undefined;
  public index = -1;
}

export class FeeMember {
  public number = -1;
  public name = new ProfileName();
}

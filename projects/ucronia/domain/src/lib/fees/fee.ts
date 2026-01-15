import { ProfileName } from "../profiles/profile-name";

export class Fee {
  public month = new Date();
  public member = new FeeMember();
  public feeType = new FeeFeeType();
  public paid = false;
  public transaction: FeeTransaction | undefined;
}

export class FeeTransaction {
  public date: Date | undefined;
  public index = -1;
}

export class FeeMember {
  public number = -1;
  public name = new ProfileName();
}

export class FeeFeeType {
  public number = 0;
  public name = '';
  public amount = 0;
}
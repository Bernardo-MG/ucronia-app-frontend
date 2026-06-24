import { MemberName } from "@ucronia/domain";

export class FeeCalendarSelection {
  public number = -1;
  public name = new MemberName();
  public month = new Date();
  public paid = false;
}
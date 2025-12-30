import { ProfileName } from "@ucronia/domain";

export class FeeCalendarSelection {
  public number = -1;
  public name = new ProfileName();
  public month = new Date();
  public paid = false;
}
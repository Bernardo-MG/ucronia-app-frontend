import { ContactName } from "@ucronia/domain";

export class FeeCalendarSelection {
  public number = -1;
  public name = new ContactName();
  public month = new Date();
  public paid = false;
}
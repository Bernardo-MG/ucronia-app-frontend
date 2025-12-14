import { ContactName } from "@ucronia/domain";

export class FeeCalendarSelection {
  number = -1;
  name = new ContactName();
  month = new Date();
  paid = false;
}
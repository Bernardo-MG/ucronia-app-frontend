import { FeeMonth } from "./fee-month";

export class UserFeeCalendar {
  fullName = '';
  memberNumber = -1;
  active = false;
  year = -1;
  months: FeeMonth[] = [];
}

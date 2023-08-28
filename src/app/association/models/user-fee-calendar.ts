import { FeeMonth } from "./fee-month";

export class UserFeeCalendar {
  name = '';
  memberId = -1;
  active = false;
  year = -1;
  months: FeeMonth[] = [];
}

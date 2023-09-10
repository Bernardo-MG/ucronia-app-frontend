import { FeeMonth } from "./fee-month";

export class UserFeeCalendar {
  memberName = '';
  memberId = -1;
  active = false;
  year = -1;
  months: FeeMonth[] = [];
}

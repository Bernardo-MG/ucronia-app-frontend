import { FeeCalendarMember } from "./fee-calendar-member";
import { FeeCalendarMonth } from "./fee-month";

export class FeeCalendar {
  member = new FeeCalendarMember();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

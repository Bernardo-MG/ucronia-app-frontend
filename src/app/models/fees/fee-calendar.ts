import { Member } from "../members/member";
import { FeeCalendarMonth } from "./fee-calendar-month";

export class FeeCalendar {
  member = new Member();
  active = false;
  year = -1;
  months: FeeCalendarMonth[] = [];
}

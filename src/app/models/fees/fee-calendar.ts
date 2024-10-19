import { Member } from "../members/member";
import { FeeCalendarMonth } from "./fee-month";

export class FeeCalendar {
  member = new Member();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

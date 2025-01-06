import { Member } from "../members/member";
import { Fee } from "./fee";

export class FeeCalendar {
  member = new Member();
  active = false;
  year = -1;
  months: FeeCalendarMonth[] = [];
}

export class FeeCalendarMonth {
  month = -1;
  fee = new Fee();
  member = new Member();
}
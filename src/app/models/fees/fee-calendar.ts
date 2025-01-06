import { Member } from "../members/member";

export class FeeCalendar {
  member = new Member();
  active = false;
  year = -1;
  months: FeeCalendarMonth[] = [];
}

export class FeeCalendarMonth {
  monthNumber = -1;
  month = '';
  paid = false;
}
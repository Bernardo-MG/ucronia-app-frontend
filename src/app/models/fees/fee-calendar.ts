import { PublicMember } from "../members/public-member";
import { FeeCalendarMonth } from "./fee-month";

export class FeeCalendar {
  member = new PublicMember();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

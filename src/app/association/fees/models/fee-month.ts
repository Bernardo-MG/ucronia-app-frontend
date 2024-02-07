import { Fee } from "./fee";
import { FeeCalendarMember } from "./fee-calendar-member";

export class FeeCalendarMonth {
  month = -1;
  fee = new Fee();
  member = new FeeCalendarMember();
}

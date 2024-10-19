import { Member } from "../members/member";
import { Fee } from "./fee";

export class FeeCalendarMonth {
  month = -1;
  fee = new Fee();
  member = new Member();
}

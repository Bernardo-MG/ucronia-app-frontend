import { PublicMember } from "../members/public-member";
import { Fee } from "./fee";

export class FeeCalendarMonth {
  month = -1;
  fee = new Fee();
  member = new PublicMember();
}

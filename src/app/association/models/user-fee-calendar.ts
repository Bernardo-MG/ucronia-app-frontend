import { FeeMonth } from "./fee-month";

export class UserFeeCalendar {
    name = '';
    surname = '';
    memberId = -1;
    active = false;
    year = -1;
    months: FeeMonth[] = [];
}

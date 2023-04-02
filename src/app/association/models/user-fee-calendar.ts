import { FeeMonth } from "./fee-month";

export class UserFeeCalendar {
    name: string = '';
    surname: string = '';
    memberId: number = -1;
    active: boolean = false;
    year: number = -1;
    months: FeeMonth[] = [];
}

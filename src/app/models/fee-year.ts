import { FeeMonth } from "./fee-month";

export class FeeYear {
    member: string = '';
    memberId: number = -1;
    active: boolean = false;
    year: number = -1;
    months: FeeMonth[] = [];
}

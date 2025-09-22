import { PersonName } from "../person/person-name";

export class FeeCalendarYear {
  member = new FeeCalendarMember();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

export class FeeCalendarMonth {
  month = new Date();
  paid = false;
}

export class FeeCalendarMember {
  number = -1;
  name = new PersonName();
  active = false;
}
import { PersonName } from "../person/person-name";

export class FeeCalendar {
  member = new FeeCalendarMember();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

export class FeeCalendarMonth {
  month = '';
  paid = false;
}

export class FeeCalendarMember {
  number = -1;
  name = new PersonName();
  active = false;
}
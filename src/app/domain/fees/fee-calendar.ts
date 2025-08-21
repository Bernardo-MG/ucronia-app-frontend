import { PersonName } from "../person/person-name";

export class FeeCalendar {
  member = new FeeCalendarPerson();
  year = -1;
  months: FeeCalendarMonth[] = [];
}

export class FeeCalendarMonth {
  monthNumber = -1;
  month = '';
  paid = false;
}

export class FeeCalendarPerson {
  number = -1;
  name = new PersonName();
  membership = new FeeCalendarPersonMembership();
}

export class FeeCalendarPersonMembership {
  active = false;
}
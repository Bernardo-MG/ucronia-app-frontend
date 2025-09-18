import { PersonName } from "@app/domain/person/person-name";

export class FeeCalendarSelection {
  number = -1;
  name = new PersonName();
  month = '';
  paid = false;
}
import { PersonName } from "../person/person-name";

export class Member {
  number = -1;
  active = false;
  name = new PersonName();
  phone = '';
  identifier = '';
}

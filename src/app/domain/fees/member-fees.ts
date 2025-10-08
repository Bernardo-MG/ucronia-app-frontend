import { PersonName } from "../person/person-name";

export class MemberFees {
  member = new Member();
  months: Fee[] = [];
}

export class Fee {
  month = new Date();
  paid = false;
}

export class Member {
  number = -1;
  name = new PersonName();
  active = false;
}
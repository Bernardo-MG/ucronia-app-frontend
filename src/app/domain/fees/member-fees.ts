import { PersonName } from "../person/person-name";

export class MemberFees {
  member = new Member();
  fees: Fee[] = [];
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
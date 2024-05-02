import { Member } from "@app/association/members/models/member";

export class Donor {
  name = '';
  number = -1;
  member = new Member();
}

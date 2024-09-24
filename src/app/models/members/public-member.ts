import { MemberName } from "@app/models/members/member-name";

export class PublicMember {
  number = -1;
  active = false;
  name = new MemberName();
}

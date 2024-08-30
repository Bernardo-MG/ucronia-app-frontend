import { MemberName } from "@app/association/members/shared/models/member-name";

export class PublicMember {
  number = -1;
  active = false;
  name = new MemberName();
}

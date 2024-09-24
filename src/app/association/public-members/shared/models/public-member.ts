import { MemberName } from "@app/association-admin/members/shared/models/member-name";

export class PublicMember {
  number = -1;
  active = false;
  name = new MemberName();
}

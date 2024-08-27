import { Member } from "@app/association/members/shared/models/member";

/**
 * Account for a user.
 */
export class Account {
  /**
   * User username.
   */
  username = '';
  /**
   * User name.
   */
  name = '';
  /**
   * User email.
   */
  email = '';
  /**
   * User member.
   */
  member: Member | undefined = undefined;
}
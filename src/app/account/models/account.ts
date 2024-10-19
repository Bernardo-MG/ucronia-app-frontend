import { Person } from "@app/models/person/person";


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
   * User person.
   */
  person: Person | undefined = undefined;
}
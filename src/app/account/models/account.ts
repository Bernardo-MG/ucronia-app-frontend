import { Contact } from "@ucronia/domain";


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
   * User contact.
   */
  contact: Contact | undefined = undefined;
}
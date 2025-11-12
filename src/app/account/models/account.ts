import { Contact } from "@app/domain/contact/contact";


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
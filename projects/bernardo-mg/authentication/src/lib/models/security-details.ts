import { PermissionList } from "./permission-list";

/**
 * Security details for a user.
 */
export class SecurityDetails {
  /**
   * User username.
   */
  public username = '';
  
  /** 
   * Logged-in flag. If true, the user is logged in. 
   */
  public readonly logged: boolean;
  
  /** 
   * Authentication token for the user. 
   */
  public token = '';
  
  /** 
   * User permissions. 
   */
  public permissions = new PermissionList();

  constructor(logged: boolean) {
    this.logged = logged;
  }

}

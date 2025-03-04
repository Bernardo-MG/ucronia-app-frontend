import { PermissionList } from "./permission-list";

/**
 * Security details for a user.
 */
export class SecurityDetails {
  /**
   * User username.
   */
  username = '';
  
  /** 
   * Logged-in flag. If true, the user is logged in. 
   */
  readonly logged: boolean;
  
  /** 
   * Authentication token for the user. 
   */
  token = '';
  
  /** 
   * User permissions. 
   */
  permissions = new PermissionList();

  constructor(logged: boolean) {
    this.logged = logged;
  }

  /**
   * Checks if the current security details contain the given permission.
   *
   * @param resource permission resource.
   * @param action permission action.
   * @returns `true` if the user has the permission, `false` otherwise.
   */
  public containsPermission(resource: string, action: string): boolean {
    return this.permissions[resource]?.includes(action) ?? false;
  }
}

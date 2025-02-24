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
   * Logged in flag. If it is true, then the user is logged in.
   */
  logged: boolean;
  /**
   * Authentication token for the user.
   */
  token?: string;
  /**
   * User permissions.
   */
  permissions = new PermissionList();

  constructor(logged: boolean) {
    this.logged = logged;
  }

  /**
   * Checks if the current security details contains the received permission.
   *
   * @param resource permission resource
   * @param action permission action
   * @returns true if the security details contains the permission, false otherwise
   */
  public containsPermission(resource: string, action: string) {
    let hasPermission;

    if (resource in this.permissions) {
      hasPermission = this.permissions[resource].includes(action);
    } else {
      hasPermission = false;
    }

    return hasPermission;
  }

}
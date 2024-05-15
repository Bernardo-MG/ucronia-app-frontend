import { PermissionList } from "./permission-list";

/**
 * Data parsed from a token.
 */
export class TokenData {
  /**
   * Subscriber.
   */
  sub?: '';
  /**
   * Permissions.
   */
  permissions?: PermissionList;
}
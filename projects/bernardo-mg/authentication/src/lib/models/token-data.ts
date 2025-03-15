import { PermissionList } from "./permission-list";

/**
 * Data parsed from a token.
 */
export class TokenData {

  /**
   * Subscriber.
   */
  public sub?: string;

  /**
   * Permissions.
   */
  public permissions?: PermissionList;

}
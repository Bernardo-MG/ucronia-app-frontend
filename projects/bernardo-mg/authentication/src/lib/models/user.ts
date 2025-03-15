import { Role } from "./role";

export class User {
  public username = '';
  public name = '';
  public email = '';
  public enabled = false;
  public notExpired = true;
  public passwordNotExpired = true;
  public notLocked = true;
  public roles: Role[] = [];
}

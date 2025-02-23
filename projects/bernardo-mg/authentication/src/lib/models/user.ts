import { Role } from "./role";

export class User {
  username = '';
  name = '';
  email = '';
  enabled = false;
  notExpired = true;
  passwordNotExpired = true;
  notLocked = true;
  roles: Role[] = [];
}

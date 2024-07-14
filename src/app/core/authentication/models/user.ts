import { Role } from "./role";

export class User {
  username = '';
  name = '';
  email = '';
  enabled = false;
  passwordExpired = false;
  locked = false;
  roles: Role[] = [];
}

export class UserUpdate {
  public username = '';
  public name = '';
  public email = '';
  public enabled = false;
  public passwordNotExpired = true;
  public roles: string[] = [];
}


export class UserUpdate {
  public name = '';
  public email = '';
  public enabled = false;
  public passwordNotExpired = true;
  public roles: string[] = [];
}

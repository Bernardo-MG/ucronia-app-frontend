export class UserChange {
  // TODO: not actually in the model
  public username = '';
  public name = '';
  public email = '';
  public enabled = false;
  public passwordNotExpired = true;
  public roles: string[] = [];
}

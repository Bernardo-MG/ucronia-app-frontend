export class UserToken {
  public creationDate = new Date();
  public expirationDate = new Date();
  public scope = '';
  public token = '';
  public name = '';
  public username = '';
  public consumed = false;
  public revoked = false;
}

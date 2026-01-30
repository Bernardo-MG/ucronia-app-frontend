export class UserTokenPatch {
  constructor(
  public expirationDate: Date | undefined = undefined,
  public revoked: boolean | undefined = undefined
  ) { }
}

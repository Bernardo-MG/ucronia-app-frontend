
export class MemberCreation {
  public birthDate?: Date;
  public contactChannels: { method: number, detail: string }[] = [];
  public address = '';
  public comments = '';
  public key?: number;
  public active = true;
  public renew = true;

  constructor(
    public feeType: number,
    public identifier: string,
    public name: { firstName: string, nickname?: string, lastName: string }
  ) { }
}

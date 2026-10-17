
export class MemberCreation {
  constructor(
    public feeType: number,
    public identifier: string,
    public name: { firstName: string, nickname?: string, lastName: string }
  ) { }
}

/** Complete PUT update; omitted optional values are cleared. */
export interface MemberUpdate {
  name: { firstName: string, nickname?: string, lastName: string };
  feeType: number;
  contactChannels: { method: number, detail: string }[];
  active: boolean;
  renew: boolean;
  identifier?: string;
  birthDate?: Date;
  address?: string;
  comments?: string;
}

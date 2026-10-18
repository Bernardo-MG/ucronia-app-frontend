import { MemberName } from '@ucronia/domain';
import { ProfilePatchChannel } from '../profile/profile-patch';

export interface MemberUpdate {
  name: MemberName;
  identifier: string | null;
  feeType: number;
  key: number | null;
  birthDate: Date | null;
  contactChannels: ProfilePatchChannel[];
  address: string | null;
  comments: string | null;
  active: boolean;
  renew: boolean;
}

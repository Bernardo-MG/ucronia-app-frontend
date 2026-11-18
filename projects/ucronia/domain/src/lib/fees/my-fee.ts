import { FeeMember, FeeTransaction } from './fee';

export interface MyFee {
  month: Date;
  member: FeeMember;
  paid: boolean;
  transaction?: FeeTransaction | null;
}

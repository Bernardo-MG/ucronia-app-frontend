import { Key } from './key';

export interface KeyAssignedMember {
  number: number;
  memberNumber: number;
  name: string;
}
export interface KeyAssignment extends Key {
  member?: KeyAssignedMember | null;
}

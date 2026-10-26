import { Key } from './key';

export interface KeyAssignedProfile {
  number: number;
  name: string;
}

export interface KeyAssignment extends Key {
  profile?: KeyAssignedProfile | null;
}

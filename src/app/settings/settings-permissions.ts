import { UcroniaPermissions } from '@ucronia/auth';

export const settingsOptions = [
  { path: 'properties', permission: UcroniaPermissions.associationSettings.read },
  { path: 'fee-types', permission: UcroniaPermissions.feeType.read },
  { path: 'game-tables', permission: UcroniaPermissions.gameTable.read },
  { path: 'contact-methods', permission: UcroniaPermissions.directory.contactMethod.read }
] as const;

export const settingsPermissions = settingsOptions.map(option => option.permission);

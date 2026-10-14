import { UcroniaPermissions } from '@ucronia/auth';

export const settingsOptions = [
  { path: 'properties', permission: UcroniaPermissions.associationSettings.read },
  { path: 'fee-types', permission: UcroniaPermissions.feeType.read },
  { path: 'game-tables', permission: UcroniaPermissions.gameTable.read },
  { path: 'keys', permission: UcroniaPermissions.directory.memberProfile.read },
  { path: 'contact-methods', permission: UcroniaPermissions.directory.contactMethod.read },
  { path: 'library/author', permission: UcroniaPermissions.library.author.read },
  { path: 'library/publisher', permission: UcroniaPermissions.library.publisher.read },
  { path: 'library/system', permission: UcroniaPermissions.library.system.read },
  { path: 'library/type', permission: UcroniaPermissions.library.type.read }
] as const;

export const settingsPermissions = settingsOptions.map(option => option.permission);

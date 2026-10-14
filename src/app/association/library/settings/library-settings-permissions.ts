import { UcroniaPermissions } from '@ucronia/auth';

export const librarySettingsOptions = [
  { path: 'author', label: 'Autores', icon: 'pi pi-user', permission: UcroniaPermissions.library.author.read },
  { path: 'publisher', label: 'Editoriales', icon: 'pi pi-building', permission: UcroniaPermissions.library.publisher.read },
  { path: 'system', label: 'Sistemas', icon: 'pi pi-cog', permission: UcroniaPermissions.library.system.read },
  { path: 'type', label: 'Tipos', icon: 'pi pi-cog', permission: UcroniaPermissions.library.type.read }
] as const;

export const librarySettingsPermissions = librarySettingsOptions.map(option => option.permission);

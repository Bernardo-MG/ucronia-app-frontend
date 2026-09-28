export class StoredFile {
  public number = 0;
  public name = '';
  public description = '';
  public folderNumber: number | null = null;
  public mediaType = '';
  public size = 0;
  public publicAccess = true;
  public audit = new FileAudit();
}

export class FileFolder {
  public number = 0;
  public name = '';
  public parentNumber: number | null = null;
}

export class FileAudit {
  public createdAt?: Date;
  public updatedAt?: Date;
}

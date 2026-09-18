export class Image {
  public number = 0;
  public name = '';
  public description = '';
  public folderNumber: number | null = null;
  public mediaType = '';
  public size = 0;
  public audit = new ImageAudit();
}

export class ImageFolder {
  public number = 0;
  public name = '';
  public parentNumber: number | null = null;
}

export class ImageAudit {
  public createdAt?: Date;
  public updatedAt?: Date;
}

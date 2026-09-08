export class Image {
  public number = 0;
  public name = '';
  public description = '';
  public mediaType = '';
  public size = 0;
  public audit = new ImageAudit();
}

export class ImageAudit {
  public createdAt?: Date;
  public updatedAt?: Date;
}

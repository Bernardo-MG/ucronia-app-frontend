import { AssetType } from "./asset-type";

export class Asset {
  public number = 0;
  public name = '';
  public description = '';
  public folderNumber: number | null = null;
  public mediaType = '';
  public size = 0;
  public publicAccess = true;
  public type: AssetType = 'FILE';
  public audit = new AssetAudit();
}

export class AssetAudit {
  public createdAt?: Date;
  public updatedAt?: Date;
}

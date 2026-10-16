import { HttpClient } from '@angular/common/http';
import { FileEndpoint } from './file-endpoint';
import { FolderEndpoint } from './folder-endpoint';
import { ImageEndpoint } from './image-endpoint';

export class AssetEndpoint {

  private readonly fileEndpoint: FileEndpoint;
  private readonly imageEndpoint: ImageEndpoint;
  private readonly folderEndpoint: FolderEndpoint;

  public constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: string
  ) {
    this.fileEndpoint = new FileEndpoint(this.http, this.apiUrl);
    this.imageEndpoint = new ImageEndpoint(this.http, this.apiUrl);
    this.folderEndpoint = new FolderEndpoint(this.http, this.apiUrl);
  }

  public get file(): FileEndpoint {
    return this.fileEndpoint;
  }

  public get image(): ImageEndpoint {
    return this.imageEndpoint;
  }

  public get folder(): FolderEndpoint {
    return this.folderEndpoint;
  }
}
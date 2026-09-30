import { HttpClient } from '@angular/common/http';
import { AssetResourceEndpoint } from './asset-resource-endpoint';

export class FileEndpoint extends AssetResourceEndpoint {

  public constructor(
    http: HttpClient,
    apiUrl: string
  ) {
    super(http, apiUrl, 'files', 'FILE', true);
  }
}

import { HttpClient } from '@angular/common/http';
import { AssetResourceEndpoint } from './asset-resource-endpoint';

export class ImageEndpoint extends AssetResourceEndpoint {

  public constructor(
    http: HttpClient,
    apiUrl: string
  ) {
    super(http, apiUrl, 'images', 'IMAGE', false);
  }
}

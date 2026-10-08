import { mapAudit } from './audit-endpoint-utils';
import { HttpParams } from '@angular/common/http';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { Asset, AssetType } from '@ucronia/domain';

export function assetPageParams(page: number | undefined, size: number | undefined,
  sort: Sorting | undefined): HttpParams {
  let params = new HttpParams();
  if (page) params = params.append('page', page);
  if (size) params = params.append('size', size);
  sort?.properties.forEach(property => params = params.append('sort',
    `${String(property.property)}|${property.direction}`));
  return params;
}

export function mapAsset(asset: Asset, type: AssetType): Asset {
  asset.type ??= type;
  asset.publicAccess ??= true;
  return mapAudit(asset);
}

export function mapAssetPage(page: PaginatedResponse<Asset>, type: AssetType): PaginatedResponse<Asset> {
  page.content = page.content
    .filter(asset => !asset.type || asset.type === type)
    .map(asset => mapAsset(asset, type));
  return page;
}
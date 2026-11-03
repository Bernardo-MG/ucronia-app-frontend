import { Asset } from '@ucronia/domain';
import { mapAssetPage } from './asset-endpoint-utils';
import { PaginatedResponse } from '@bernardo-mg/request';

describe('asset-endpoint-utils backend results', () => {
  it('preserves mixed asset types and server totals in folder responses', () => {
    const image = Object.assign(new Asset(), { number: 1, type: 'IMAGE' });
    const file = Object.assign(new Asset(), { number: 2, type: 'FILE' });
    const page = Object.assign(new PaginatedResponse<Asset>(), { content: [image, file], totalElements: 42 });
    const result = mapAssetPage(page, 'IMAGE');
    expect(result.content).toEqual([image, file]);
    expect(result.totalElements).toBe(42);
  });
});

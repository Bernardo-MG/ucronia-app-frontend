import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Asset, AssetType } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { assetPageParams, mapAsset, mapAssetPage } from './asset-endpoint-utils';

export class AssetResourceEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: string,
    private readonly resource: 'files' | 'images',
    private readonly assetType: AssetType,
    private readonly downloadContent: boolean
  ) { }

  public page(page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<Asset>> {
    const params = assetPageParams(page, size, sort);
    return this.http.get<PaginatedResponse<Asset>>(`${this.apiUrl}/${this.resource}`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAssetPage(response, this.assetType))
      );
  }

  public get(number: number): Observable<Asset> {
    return this.http.get<SimpleResponse<Asset>>(`${this.apiUrl}/${this.resource}/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, this.assetType))
      );
  }

  public content(number: number): Observable<Blob> {
    const url = `${this.apiUrl}/assets/${number}/content`;
    const request = this.downloadContent
      ? this.http.get(url, { params: { download: true }, responseType: 'blob' })
      : this.http.get(url, { responseType: 'blob' });
    return request.pipe(catchError(this.errorInterceptor.handle));
  }

  public contentUrl(number: number): string {
    const url = `${this.apiUrl}/assets/${number}/content`;
    return this.downloadContent ? `${url}?download=true` : url;
  }

  public create(name: string, description: string, publicAccess: boolean, file: File): Observable<Asset> {
    return this.http.post<SimpleResponse<Asset>>(`${this.apiUrl}/${this.resource}`,
      this.formData(name, description, publicAccess, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, this.assetType))
      );
  }

  public update(number: number, name: string, description: string, publicAccess: boolean, file: File): Observable<Asset> {
    return this.http.put<SimpleResponse<Asset>>(`${this.apiUrl}/${this.resource}/${number}`,
      this.formData(name, description, publicAccess, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, this.assetType))
      );
  }

  public patch(number: number, name: string, description: string, publicAccess: boolean): Observable<Asset> {
    return this.http.patch<SimpleResponse<Asset>>(`${this.apiUrl}/${this.resource}/${number}`,
      { name, description, publicAccess })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, this.assetType))
      );
  }

  public delete(number: number): Observable<Asset> {
    return this.http.delete<SimpleResponse<Asset>>(`${this.apiUrl}/${this.resource}/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, this.assetType))
      );
  }

  private formData(name: string, description: string, publicAccess: boolean, file: File): FormData {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('publicAccess', String(publicAccess));
    data.append('file', file);
    return data;
  }

}
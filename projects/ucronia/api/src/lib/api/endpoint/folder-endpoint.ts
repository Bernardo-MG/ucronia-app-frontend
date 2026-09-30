import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Asset, AssetFolder, AssetType } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { assetPageParams, mapAsset, mapAssetPage } from './asset-endpoint-utils';

export class FolderEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: string
  ) { }

  public folders(): Observable<AssetFolder[]> {
    return this.http.get<AssetFolder[]>(`${this.apiUrl}/asset/folders`)
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public createFolder(name: string, parentNumber: number | null): Observable<AssetFolder> {
    return this.http.post<AssetFolder>(`${this.apiUrl}/asset/folders`, { name, parentNumber })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public updateFolder(number: number, name: string, parentNumber: number | null): Observable<AssetFolder> {
    return this.http.put<AssetFolder>(`${this.apiUrl}/asset/folders/${number}`, { name, parentNumber })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public deleteFolder(number: number): Observable<AssetFolder> {
    return this.http.delete<AssetFolder>(`${this.apiUrl}/asset/folders/${number}`)
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public page(folderNumber: number | null, type: AssetType, page: number | undefined = undefined,
    size: number | undefined = undefined, sort: Sorting | undefined = undefined): Observable<Page<Asset>> {
    const params = assetPageParams(page, size, sort);
    const folderPath = folderNumber === null ? 'root' : String(folderNumber);
    return this.http.get<PaginatedResponse<Asset>>(`${this.apiUrl}/asset/folders/${folderPath}/assets`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAssetPage(response, type))
      );
  }

  public moveToFolder(assetNumber: number, folderNumber: number, type: AssetType): Observable<Asset> {
    return this.http.put<SimpleResponse<Asset>>(
      `${this.apiUrl}/asset/folders/${folderNumber}/assets/${assetNumber}`, null)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, type))
      );
  }

  public moveToRoot(assetNumber: number, type: AssetType): Observable<Asset> {
    return this.http.delete<SimpleResponse<Asset>>(`${this.apiUrl}/asset/folders/assets/${assetNumber}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => mapAsset(response.content, type))
      );
  }

}
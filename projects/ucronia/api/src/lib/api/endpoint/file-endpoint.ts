import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { StoredFile, FileFolder } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class FileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: string
  ) { }

  public page(page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<StoredFile>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<StoredFile>>(`${this.apiUrl}/files`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapPage(response))
      );
  }

  public folderPage(folderNumber: number, page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<StoredFile>> {
    return this.filePage(`${this.apiUrl}/file-folders/${folderNumber}/files`, page, size, sort);
  }

  public rootPage(page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<StoredFile>> {
    return this.filePage(`${this.apiUrl}/file-folders/root/files`, page, size, sort);
  }

  public folders(): Observable<FileFolder[]> {
    return this.http.get<FileFolder[]>(`${this.apiUrl}/file-folders`)
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public createFolder(name: string, parentNumber: number | null): Observable<FileFolder> {
    return this.http.post<FileFolder>(`${this.apiUrl}/file-folders`, { name, parentNumber })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public updateFolder(number: number, name: string, parentNumber: number | null): Observable<FileFolder> {
    return this.http.put<FileFolder>(`${this.apiUrl}/file-folders/${number}`, { name, parentNumber })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public deleteFolder(number: number): Observable<FileFolder> {
    return this.http.delete<FileFolder>(`${this.apiUrl}/file-folders/${number}`)
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public moveToFolder(fileNumber: number, folderNumber: number): Observable<StoredFile> {
    return this.http.put<SimpleResponse<StoredFile>>(
      `${this.apiUrl}/file-folders/${folderNumber}/files/${fileNumber}`, null)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public moveToRoot(fileNumber: number): Observable<StoredFile> {
    return this.http.delete<SimpleResponse<StoredFile>>(`${this.apiUrl}/file-folders/files/${fileNumber}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public get(number: number): Observable<StoredFile> {
    return this.http.get<SimpleResponse<StoredFile>>(`${this.apiUrl}/files/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public content(number: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/${number}/content`, { responseType: 'blob' })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public create(name: string, description: string, publicAccess: boolean, file: File): Observable<StoredFile> {
    return this.http.post<SimpleResponse<StoredFile>>(`${this.apiUrl}/files`,
      this.formData(name, description, publicAccess, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public update(number: number, name: string, description: string, publicAccess: boolean, file: File): Observable<StoredFile> {
    return this.http.put<SimpleResponse<StoredFile>>(`${this.apiUrl}/files/${number}`,
      this.formData(name, description, publicAccess, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public patch(number: number, name: string, description: string, publicAccess: boolean): Observable<StoredFile> {
    return this.http.patch<SimpleResponse<StoredFile>>(`${this.apiUrl}/files/${number}`, { name, description, publicAccess })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
      );
  }

  public delete(number: number): Observable<StoredFile> {
    return this.http.delete<SimpleResponse<StoredFile>>(`${this.apiUrl}/files/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapFile(response.content))
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

  private filePage(url: string, page: number | undefined, size: number | undefined,
    sort: Sorting | undefined): Observable<Page<StoredFile>> {
    let params = new HttpParams();
    if (page) params = params.append('page', page);
    if (size) params = params.append('size', size);
    sort?.properties.forEach(property => params = params.append('sort',
      `${String(property.property)}|${property.direction}`));
    return this.http.get<PaginatedResponse<StoredFile>>(url, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapPage(response))
      );
  }

  private mapFile(file: StoredFile): StoredFile {
    file.publicAccess ??= true;
    if (file.audit?.createdAt) file.audit.createdAt = new Date(file.audit.createdAt);
    if (file.audit?.updatedAt) file.audit.updatedAt = new Date(file.audit.updatedAt);
    return file;
  }

  private mapPage(page: PaginatedResponse<StoredFile>): PaginatedResponse<StoredFile> {
    page.content = page.content.map(file => this.mapFile(file));
    return page;
  }
}

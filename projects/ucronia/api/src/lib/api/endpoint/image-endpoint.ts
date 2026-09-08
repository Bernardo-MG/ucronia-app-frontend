import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { Image } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class ImageEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private readonly http: HttpClient,
    private readonly apiUrl: string
  ) { }

  public page(page: number | undefined = undefined, size: number | undefined = undefined,
    sort: Sorting | undefined = undefined): Observable<Page<Image>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties.forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Image>>(`${this.apiUrl}/images`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapPage(response))
      );
  }

  public get(number: number): Observable<Image> {
    return this.http.get<SimpleResponse<Image>>(`${this.apiUrl}/images/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapImage(response.content))
      );
  }

  public content(number: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${number}/content`, { responseType: 'blob' })
      .pipe(catchError(this.errorInterceptor.handle));
  }

  public contentUrl(number: number): string {
    return `${this.apiUrl}/images/${number}/content`;
  }

  public create(name: string, description: string, file: File): Observable<Image> {
    return this.http.post<SimpleResponse<Image>>(`${this.apiUrl}/images`, this.formData(name, description, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapImage(response.content))
      );
  }

  public update(number: number, name: string, description: string, file: File): Observable<Image> {
    return this.http.put<SimpleResponse<Image>>(`${this.apiUrl}/images/${number}`,
      this.formData(name, description, file))
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapImage(response.content))
      );
  }

  public delete(number: number): Observable<Image> {
    return this.http.delete<SimpleResponse<Image>>(`${this.apiUrl}/images/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => this.mapImage(response.content))
      );
  }

  private formData(name: string, description: string, file: File): FormData {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('file', file);
    return data;
  }

  private mapImage(image: Image): Image {
    if (image.audit?.createdAt) image.audit.createdAt = new Date(image.audit.createdAt);
    if (image.audit?.updatedAt) image.audit.updatedAt = new Date(image.audit.updatedAt);
    return image;
  }

  private mapPage(page: PaginatedResponse<Image>): PaginatedResponse<Image> {
    page.content = page.content.map(image => this.mapImage(image));
    return page;
  }
}

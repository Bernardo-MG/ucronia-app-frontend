import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { Sort } from '@app/api/models/sort';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { PaginatedResponse } from '../models/paginated-response';

export class ReadOperations<T> {

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public fetch(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(this.queryUrl, this.options).pipe(
      map((response: ApiResponse<T[]>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public fetchPaged(): Observable<PaginatedResponse<T[]>> {
    return this.http.get<PaginatedResponse<T[]>>(this.queryUrl, this.options).pipe(
      map((response: PaginatedResponse<T[]>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public fetchUnwrapped(): Observable<T[]> {
    return this.fetch().pipe(map(r => r.content));
  }

  public fetchOne(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.queryUrl, this.options).pipe(
      map((response: ApiResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public fetchOneUnwrapped(): Observable<T> {
    // TODO: add unwrap operation to be used after fetch
    return this.fetchOne().pipe(map(r => r.content));
  }

  public sort(sort: Sort<T>[]): ReadOperations<T> {
    let params: HttpParams;

    params = this.getHttpParams();

    for (var i = 0; i < sort.length; i += 1) {
      const fieldSort = sort[i];
      params = params.append('sort', `${String(fieldSort.property)},${fieldSort.order}`);
    }

    this.options = { params: params };

    return this;
  }

  public page(pagination: PaginationRequest | undefined): ReadOperations<T> {
    let params: HttpParams;

    if (pagination) {
      params = this.getHttpParams();

      if (pagination.page) {
        params = params.set('page', pagination.page);
      }
      if (pagination.size) {
        params = params.set('size', pagination.size);
      }

      this.options = { params: params };
    }

    return this;
  }

  public parameter(name: string, value: any): ReadOperations<T> {
    let params: HttpParams;

    params = this.getHttpParams();

    params = params.append(name, value);

    this.options = { params: params };

    return this;
  }

  private getHttpParams(): HttpParams {
    let params: HttpParams;

    if (this.options.params) {
      params = this.options.params;
    } else {
      params = new HttpParams();
      this.options = { params: params };
    }

    return params;
  }

  private handleError() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}

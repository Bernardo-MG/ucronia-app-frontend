import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../models/error-response';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../../../../core/api/models/sort';

export class ReadPagedOperations<T> {

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public fetch(): Observable<PaginatedResponse<T[]>> {
    return this.http.get<PaginatedResponse<T[]>>(this.queryUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public fetchOne(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.queryUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public sort(sort: Sort<T>[]): ReadPagedOperations<T> {
    let params: HttpParams;

    params = this.getHttpParams();

    for (let i = 0; i < sort.length; i += 1) {
      const fieldSort = sort[i];
      params = params.append('sort', `${String(fieldSort.property)},${fieldSort.order}`);
    }

    this.options = { params: params };

    return this;
  }

  public page(pagination: PaginationRequest): ReadPagedOperations<T> {
    let params: HttpParams;
    let paged: boolean;

    params = this.getHttpParams();

    paged = false;
    if (pagination.page) {
      params = params.set('page', pagination.page);
      paged = true;
    }
    if (pagination.size) {
      params = params.set('size', pagination.size);
      paged = true;
    }

    if (paged) {
      this.options = { params: params };
    }

    return this;
  }

  public parameter(name: string, value: any): ReadPagedOperations<T> {
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
    return (error: HttpErrorResponse) => {

      console.error(error.message);

      if (error.error) {
        const errorResponse: ErrorResponse = error.error;
        errorResponse.errors.forEach(e => console.error(e.message));
      }

      throw new Error(error.message);
    };
  }

}

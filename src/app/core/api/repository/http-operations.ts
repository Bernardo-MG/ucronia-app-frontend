import { Observable } from 'rxjs';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../models/sort';

export interface HttpOperations {

  create<T>(): Observable<T>;

  read<T>(): Observable<T>;

  update<T>(): Observable<T>;

  delete<T>(): Observable<T>;

  body(content: any): HttpOperations;

  route(route: string): HttpOperations;

  appendRoute(route: string): HttpOperations;

  parameter(name: string, value: any): HttpOperations;

  sort(sort: Sort<any>[] | undefined): HttpOperations;

  page(pagination: PaginationRequest | undefined): HttpOperations;

}

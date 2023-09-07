import { Observable } from 'rxjs';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../models/sort';

export interface Request {

  create<T>(): Observable<T>;

  read<T>(): Observable<T>;

  update<T>(): Observable<T>;

  delete<T>(): Observable<T>;

  body(content: any): Request;

  route(route: string): Request;

  appendRoute(route: string): Request;

  parameter(name: string, value: any): Request;

  sort(sort: Sort<any>[] | undefined): Request;

  page(pagination: PaginationRequest | undefined): Request;

}

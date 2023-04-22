import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { Sort } from '@app/shared/utils/api/models/sort';
import { Observable } from 'rxjs';

export interface ReadOperations {

  fetch<T>(): Observable<T>;

  route(route: string): ReadOperations;

  appendRoute(route: string): ReadOperations;

  parameter(name: string, value: any): ReadOperations;

  sort(sort: Sort<any>[] | undefined): ReadOperations;

  page(pagination: PaginationRequest | undefined): ReadOperations;

}

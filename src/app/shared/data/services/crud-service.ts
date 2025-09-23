import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { Observable } from 'rxjs';

export interface CrudService<E> {

  getAll(page: number, sort: Sorting): Observable<PaginatedResponse<E>>;

  create(entity: E): Observable<E>;

  update(entity: E): Observable<E>;

  delete(id: number): Observable<E>;

}

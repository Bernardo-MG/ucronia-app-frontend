import { Page, Sorting } from '@bernardo-mg/request';
import { Observable } from 'rxjs';

export interface CrudService<E> {

  getAll(page: number | undefined, sort: Sorting): Observable<Page<E>>;

  create(entity: E): Observable<E>;

  update(entity: E): Observable<E>;

  delete(id: number): Observable<E>;

}

import { Observable } from 'rxjs';

export interface UpdateOperations {

  push<T>(): Observable<T>;

  id(id: number): UpdateOperations;

  body(content: any): UpdateOperations;

  route(route: string): UpdateOperations;

  appendRoute(route: string): UpdateOperations;

}

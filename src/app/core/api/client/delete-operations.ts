import { Observable } from 'rxjs';

export interface DeleteOperations {

  push<T>(): Observable<T>;

  id(id: number): DeleteOperations;

  route(route: string): DeleteOperations;

  appendRoute(route: string): DeleteOperations;

}

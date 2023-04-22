import { Observable } from 'rxjs';

export interface ReadOperations {

  fetch<T>(): Observable<T>;

  route(route: string): ReadOperations;

  appendRoute(route: string): ReadOperations;

  parameter(name: string, value: any): ReadOperations;

}

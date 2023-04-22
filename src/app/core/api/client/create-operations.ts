import { Observable } from 'rxjs';

export interface CreateOperations {

  push<T>(): Observable<T>;

  body(content: any): CreateOperations;

  route(route: string): CreateOperations;

  appendRoute(route: string): CreateOperations;

}

import { Observable } from 'rxjs';

export interface Request {

  create<T>(): Observable<T>;

  read<T>(): Observable<T>;

  update<T>(): Observable<T>;

  delete<T>(): Observable<T>;

  body(content: any): Request;

  route(route: string): Request;

  appendRoute(route: string): Request;

  parameter(name: string, value: any): Request;

}

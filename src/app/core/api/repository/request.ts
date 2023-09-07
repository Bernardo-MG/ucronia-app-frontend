import { Observable } from 'rxjs';

export interface Request {

  create<T>(body: any): Observable<T>;

  read<T>(): Observable<T>;

  update<T>(body: any): Observable<T>;

  delete<T>(): Observable<T>;

  route(route: string): Request;

  appendRoute(route: string): Request;

  parameter(name: string, value: any): Request;

}

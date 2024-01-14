import { Observable } from 'rxjs';
import { Sort } from '../models/sort';

export interface Request {

  create<T>(body: any): Observable<T>;

  read<T>(): Observable<T>;

  update<T>(body: any): Observable<T>;

  delete<T>(): Observable<T>;

  patch<T>(body: any): Observable<T>;

  route(route: string): Request;

  appendRoute(route: string): Request;

  parameter(name: string, value: any): Request;

  sort(sort: Sort[]): Request;

}

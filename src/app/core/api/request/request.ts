import { Observable } from 'rxjs';
import { PaginatedQuery } from '../models/paginated-query';
import { Sort } from '../models/sort';

/**
 * Sets up and executes requests.
 */
export interface Request {

  /**
   * Execute a create request.
   *
   * @param body the object to create
   * @returns Observable with the request response
   */
  create<T>(body: any): Observable<T>;

  /**
   * Execute a read request.
   *
   * @returns Observable with the requested data
   */
  read<T>(): Observable<T>;

  /**
   * Execute an update request.
   *
   * @param body the object to update
   * @returns Observable with the request response
   */
  update<T>(body: any): Observable<T>;

  /**
   * Execute a delete request.
   *
   * @returns Observable with the request response
   */
  delete<T>(): Observable<T>;

  /**
   * Execute a patch request.
   *
   * @param body the object to patch
   * @returns Observable with the request response
   */
  patch<T>(body: any): Observable<T>;

  /**
   * Appends the route and returns an updated Request.
   * 
   * @param route route to append
   */
  appendRoute(route: string): Request;

  /**
   * Adds a request parameter and returns an updated Request.
   * 
   * @param name parameter name
   * @param value parameter value
   */
  parameter(name: string, value: any): Request;

  /**
   * Adds sorting and returns an updated Request.
   * 
   * @param sort sorting to apply
   */
  sort(sort: Sort[]): Request;

  /**
   * Adds a pagination query and returns an updated Request.
   * 
   * @param sort pagination query to apply
   */
  query(query: PaginatedQuery): Request;

}

import { Observable } from 'rxjs';
import { PaginatedQuery } from '../models/paginated-query';
import { Sort } from '../models/sort';
import { Sorting } from '../models/sorting';
import { Params } from './params';

/**
 * Sets up and executes requests.
 */
export interface Client {

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
  appendRoute(route: string): Client;

  /**
   * Adds a request parameter and returns an updated Request.
   * 
   * @param name parameter name
   * @param value parameter value
   */
  parameter(name: string, value: any): Client;

  parameters(parameters: Params): Client;

  /**
   * Adds sorting and returns an updated Request.
   * 
   * @param sort sorting to apply
   */
  sort(sort: Sort): Client;

  pagination(page: number, size: number): Client;

  page(page: number): Client;

  /**
   * Adds a pagination query and returns an updated Request.
   * 
   * @param sort pagination query to apply
   */
  query(query: PaginatedQuery): Client;

}

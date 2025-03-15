import { Observable } from 'rxjs';
import { ParamLoader } from '../params/param-loader';

/**
 * Client for CRUD requests.
 */
export interface CrudClient {

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
   * Appends the route and returns an updated client.
   * 
   * @param route route to append
   */
  appendRoute(route: string): CrudClient;

  /**
   * Adds a request parameter and returns an updated client.
   * 
   * @param name parameter name
   * @param value parameter value
   */
  parameter(name: string, value: string | number | boolean | undefined): CrudClient;

  /**
   * Adds parameters through a loader and returns an updated client.
   * 
   * @param loader parameter loader
   */
  loadParameters(loader: ParamLoader): CrudClient;

}

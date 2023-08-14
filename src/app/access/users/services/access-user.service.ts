import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessUserService {

  private activateUserRequestUrl = environment.apiUrl + "/user/activate";

  constructor(
    private client: AccessApiClient,
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    return this.client.user().page(pagination).sort(pagination?.sort).readAll();
  }

  public getRoles(id: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const sort: Sort<Role> = new Sort<Role>('name');
    return this.client.userRoles(id).page({ page }).sort([sort]).readAll();
  }

  public getRoleSelection(page: number): Observable<PaginatedResponse<Role[]>> {
    const sort = new Sort<Role>('name');
    return this.client.role().page({ page }).sort([sort]).readAll();
  }

  public create(data: User): Observable<User> {
    return this.client.user().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    return this.client.user().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.user().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    return this.client.user().id(id).readOne().pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).update({ id: role }).pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).delete(role).pipe(map(r => r.content));
  }

  public activateUser(token: string, reset: PasswordReset): Observable<ApiResponse<void>> {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(`${this.activateUserRequestUrl}/${token}`, reset);
  }

  public validateActivateUserToken(token: string): Observable<ApiResponse<boolean>> {
    return this.http
      // Validate token request
      .get<ApiResponse<boolean>>(`${this.activateUserRequestUrl}/${token}`);
  }

}

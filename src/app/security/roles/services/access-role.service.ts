import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { Role } from '@app/core/authentication/models/role';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sort, SortingParams, SortProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessRoleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Role[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('name')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<Role[]>>();
  }

  public getAvailablePermissions(role: string, page: number, sort: Sort): Observable<PaginatedResponse<ResourcePermission[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('resource'), new SortProperty('action')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .appendRoute(`/${role}/permission/available`)
      .read<PaginatedResponse<ResourcePermission[]>>();
  }

  public create(data: Role): Observable<Role> {
    return this.getClient()
      .create<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public update(role: string, data: Role): Observable<Role> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .update<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public delete(role: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(role: string): Observable<Role> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .read<SimpleResponse<Role>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/security/role');
  }

}

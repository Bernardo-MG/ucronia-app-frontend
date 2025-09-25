import { Injectable, inject } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessRoleService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/role');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<Role>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('name')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<Role>>();
  }

  public getAvailablePermissions(role: string, page: number, sort: Sorting): Observable<PaginatedResponse<ResourcePermission>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('resource'), new SortingProperty('action')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .appendRoute(`/${role}/permission/available`)
      .read<PaginatedResponse<ResourcePermission>>();
  }

  public create(data: Role): Observable<Role> {
    return this.client
      .create<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: Role): Observable<Role> {
    return this.client
      .appendRoute(`/${data.name}`)
      .update<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public delete(role: string): Observable<boolean> {
    return this.client
      .appendRoute(`/${role}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(role: string): Observable<Role> {
    return this.client
      .appendRoute(`/${role}`)
      .read<SimpleResponse<Role>>()
      .pipe(map(r => r.content));
  }

}

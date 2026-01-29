import { inject, Injectable } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { environment } from 'environments/environment';
import { combineLatest, expand, map, Observable, of, reduce } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RoleService {

  private securityClient = inject(SecurityClient);

  private readonly client;

  private readonly permissionsClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/role');
    this.permissionsClient = clientProvider.url(environment.apiUrl + '/security/permission');
  }

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<Role>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('name')
        ]
      )
    );

    return this.securityClient.role.page(page, undefined, sorting);
  }

  public getAvailablePermissions(role: string): Observable<ResourcePermission[]> {
    return combineLatest([
      this.getOne(role),
      this.getAllPermissions()
    ]).pipe(
      map(([role, permissions]) => {
        const rolePermissions = role.permissions?.map(p => `${p.resource}:${p.action}`) ?? [];
        return permissions.filter(permission => !rolePermissions.includes(`${permission.resource}:${permission.action}`));
      })
    );
  }

  public getAllPermissions(): Observable<ResourcePermission[]> {
    const sorting = new SortingParams(
      [new SortingProperty('resource'), new SortingProperty('action')]
    );
    const pageSize = 100;

    return this.permissionsClient
      .loadParameters(new PaginationParams(1, pageSize))
      .loadParameters(sorting)
      .read<PaginatedResponse<ResourcePermission>>()
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.permissionsClient
              .loadParameters(new PaginationParams(nextPage, pageSize))
              .loadParameters(sorting)
              .read<PaginatedResponse<ResourcePermission>>();
          }
          return of();
        }),
        // accumulate roles from all pages into one array
        reduce((permissions: ResourcePermission[], res?: PaginatedResponse<ResourcePermission>) => {
          return res ? [...permissions, ...res.content] : permissions;
        }, [])
      );
  }

  public create(role: Role): Observable<Role> {
    return this.securityClient.role.create(role);
  }

  public update(data: Role): Observable<Role> {
    return this.securityClient.role.update(data.name, data);
  }

  public delete(role: string): Observable<Role> {
    return this.securityClient.role.delete(role);
  }

  public getOne(role: string): Observable<Role> {
    return this.securityClient.role.get(role);
  }

}

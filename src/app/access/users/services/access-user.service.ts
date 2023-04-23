import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { DeleteOperations } from '@app/shared/utils/api/request/delete-operations';
import { ReadPagedOperations } from '@app/shared/utils/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { UpdateOperations } from '@app/shared/utils/api/request/update-operations';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessUserService {

  private userUrl = environment.apiUrl + "/security/user";

  constructor(
    private client: RequestClient,
    private newClient: AccessApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    return this.newClient.user().page(pagination).sort(pagination?.sort).readAll();
  }

  public getRoles(id: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadPagedOperations<Role> = this.client.readPaged(`${this.userUrl}/${id}/role`);
    const sort: Sort<Role> = new Sort<Role>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
  }

  public getRoleSelection(page: number): Observable<PaginatedResponse<Role[]>> {
    const sort = new Sort<Role>('name');
    return this.newClient.role().page({ page }).sort([sort]).readAll();
  }

  public create(data: User): Observable<User> {
    return this.newClient.user().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    return this.newClient.user().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.newClient.user().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    return this.newClient.user().id(id).readOne().pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<boolean> {
    const clt: UpdateOperations<boolean> = this.client.update(`${this.userUrl}/${id}/role`);
    return clt.body({ id: role }).push().pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<boolean> {
    const clt: DeleteOperations<boolean> = this.client.delete(`${this.userUrl}/${id}/role`);
    return clt.id(role).push().pipe(map(r => r.content));
  }

}

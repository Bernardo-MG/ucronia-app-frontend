import { Injectable } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AngularAssociationApiClient } from '@app/core/api/client/angular-association-api-client';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { DeleteOperations } from '@app/shared/utils/api/request/delete-operations';
import { ReadPagedOperations } from '@app/shared/utils/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient,
    private newClient: AngularAssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.newClient.member().fetch(pagination);
  }

  public create(data: Member): Observable<Member> {
    return this.newClient.member().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.newClient.member().update(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Member> {
    return this.newClient.member().delete(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.newClient.member().id(id).fetch().pipe(map(r => r.content));
  }

  public countActive(): Observable<number> {
    const clt: ReadPagedOperations<Member> = this.client.readPaged(this.memberUrl);

    clt.parameter("active", true);
    return clt.fetch().pipe(map(r => r.totalElements));
  }

}

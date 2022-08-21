import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/models/api-response';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMemberService {

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient
  ) { }

  public getMembers(): Observable<Member[]> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl);
    return clt.fetchUnwrapped();
  }

  public getMember(id: number): Observable<Member> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

  public create(member: Member): Observable<ApiResponse<Member>> {
    const clt: CreateOperations<Member> = this.client.create(this.memberUrl);
    return clt.body(member).push();
  }

  public update(id: number, member: Member): Observable<ApiResponse<Member>> {
    const clt: UpdateOperations<Member> = this.client.update(this.memberUrl);
    return clt.id(id).body(member).push();
  }

  public delete(id: number): Observable<ApiResponse<Member>> {
    const clt: DeleteOperations<Member> = this.client.delete(this.memberUrl);
    return clt.id(id).push();
  }

}

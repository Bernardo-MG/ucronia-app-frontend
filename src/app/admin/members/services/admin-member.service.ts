import { Injectable } from '@angular/core';
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

  public create(member: Member) {
    const clt: CreateOperations<Member> = this.client.create(this.memberUrl);
    clt.body(member).push().subscribe();
  }

  public update(member: Member) {
    const clt: UpdateOperations<Member> = this.client.update(this.memberUrl);
    clt.body(member).push().subscribe();
  }

  public delete(id: number) {
    const clt: DeleteOperations<Member> = this.client.delete(this.memberUrl);
    clt.id(id).push().subscribe();
  }

}

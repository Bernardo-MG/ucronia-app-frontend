import { Injectable } from '@angular/core';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
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

  public getAll(): Observable<Member[]> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl);
    return clt.fetchUnwrapped();
  }

  public delete(id: number): Observable<Member> {
    const clt: DeleteOperations<Member> = this.client.delete(this.memberUrl);
    return clt.id(id).pushUnwrapped();
  }

}

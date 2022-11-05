import { Injectable } from '@angular/core';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { MemberStats } from '../models/member-stats';

@Injectable({
  providedIn: 'root'
})
export class AdminMemberService {

  private memberUrl = environment.apiUrl + "/member/stats";

  constructor(
    private client: RequestClient
  ) { }

  public getStatus(): Observable<MemberStats> {
    const clt: ReadOperations<MemberStats> = this.client.read(this.memberUrl);
    return clt.fetchOne().pipe(map(r => r.content));
  }

}

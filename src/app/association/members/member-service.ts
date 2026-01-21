import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Member, MemberStatus } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(page: number | undefined = undefined, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Member>> {
    return this.ucroniaClient.member.getAll(page, sort, active, name);
  }

}

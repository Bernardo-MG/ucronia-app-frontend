import { Injectable, inject } from '@angular/core';
import { MemberBalance } from '@app/domain/members/member-balance';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MembershipEvolutionService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member/monthly');
  }

  public monthly(startDate: Date | undefined, endDate: Date | undefined): Observable<MemberBalance[]> {
    return this.client
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<MemberBalance[]>>()
      .pipe(map(r => r.content));
  }

}

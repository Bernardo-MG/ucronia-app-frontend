import { Injectable, inject } from '@angular/core';
import { MembershipEvolutionMonth } from '@app/domain/members/membership-evolution-month';
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

    this.client = clientProvider.url(environment.apiUrl + '/member/evolution');
  }

  public monthly(from: Date | undefined, to: Date | undefined): Observable<MembershipEvolutionMonth[]> {
    return this.client
      .parameter('from', from?.toISOString().slice(0, 7))
      .parameter('to', to?.toISOString().slice(0, 7))
      .read<SimpleResponse<MembershipEvolutionMonth[]>>()
      .pipe(map(r => r.content));
  }

}

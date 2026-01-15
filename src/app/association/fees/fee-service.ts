import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { FeeCreation, FeeUpdate } from '@ucronia/api';
import { Fee, FeePayment, Member, MemberStatus, Profile } from "@ucronia/domain";
import { format } from 'date-fns';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly feeClient;

  private readonly memberClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.feeClient = clientProvider.url(environment.apiUrl + '/fee');
    this.memberClient = clientProvider.url(environment.apiUrl + '/profile/member');
  }

  public create(data: FeeCreation): Observable<FeePayment> {
    return this.feeClient
      .create<SimpleResponse<FeePayment>>(data)
      .pipe(map(r => r.content));
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.feeClient
      .appendRoute('/pay')
      .create<SimpleResponse<FeePayment>>(data)
      .pipe(map(r => r.content));
  }

  public update(member: number, month: Date, data: FeeUpdate): Observable<Fee> {
    const formattedMonth = format(month, 'yyyy-MM')
    return this.feeClient
      .appendRoute(`/${formattedMonth}/${member}`)
      .update<SimpleResponse<Fee>>(data)
      .pipe(map(r => r.content));
  }

  public delete(month: Date, memberNumber: number): Observable<Fee> {
    const formattedMonth = month.toISOString().slice(0, 7);
    return this.feeClient
      .appendRoute(`/${formattedMonth}/${memberNumber}`)
      .delete<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getOne(month: Date, memberNumber: number): Observable<Fee> {
    const formattedMonth = month.toISOString().slice(0, 7);
    return this.feeClient
      .appendRoute(`/${formattedMonth}/${memberNumber}`)
      .read<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getMembers(page: number, active: MemberStatus): Observable<PaginatedResponse<Member>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

  public getOneContact(id: number): Observable<Profile> {
    return this.memberClient
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Profile>>()
      .pipe(map(r => r.content));
  }

}

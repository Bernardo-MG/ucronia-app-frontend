import { inject, Injectable } from '@angular/core';
import { Active } from '@app/domain/contact/active';
import { Contact } from '@app/domain/contact/contact';
import { Fee } from '@app/domain/fees/fee';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { FeeUpdate } from '@app/domain/fees/fee-update';
import { Member } from '@app/domain/members/member';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
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
    this.memberClient = clientProvider.url(environment.apiUrl + '/member');
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

  public update(data: FeeUpdate): Observable<Fee> {
    return this.feeClient
      .appendRoute(`/${data.month}/${data.member}`)
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

  public getMembers(page: number, active: Active): Observable<PaginatedResponse<Member>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

  public getOneContact(id: number): Observable<Contact> {
    return this.memberClient
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Contact>>()
      .pipe(map(r => r.content));
  }

}

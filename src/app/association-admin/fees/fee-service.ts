import { inject, Injectable } from '@angular/core';
import { Fee } from '@app/domain/fees/fee';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { FeeUpdate } from '@app/domain/fees/fee-update';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
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
    this.memberClient = clientProvider.url(environment.apiUrl + '/person');
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

  public delete(date: Date, memberNumber: number): Observable<boolean> {
    return this.feeClient
      .appendRoute(`/${date}/${memberNumber}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(date: Date, memberNumber: number): Observable<Fee> {
    const formattedDate = date.toISOString().slice(0, 7);
    return this.feeClient
      .appendRoute(`/${formattedDate}/${memberNumber}`)
      .read<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getPersons(page: number, active: Active): Observable<PaginatedResponse<Person>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Person>>();
  }

  public getOnePerson(id: number): Observable<Person> {
    return this.memberClient
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

}

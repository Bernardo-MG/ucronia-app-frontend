import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { FeePayment } from '@app/models/fees/fee-payment';
import { Person } from '@app/models/person/person';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Fee } from '../../../models/fees/fee';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly feeClient;

  private readonly personClient;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.feeClient = clientProvider.url(environment.apiUrl + '/fee');
    this.personClient = clientProvider.url(environment.apiUrl + '/person');
  }

  public create(data: Fee): Observable<FeePayment> {
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

  public update(date: string, memberNumber: number, data: Fee): Observable<Fee> {
    return this.feeClient
      .appendRoute(`/${date}/${memberNumber}`)
      .update<SimpleResponse<Fee>>(data)
      .pipe(map(r => r.content));
  }

  public delete(date: string, memberNumber: number): Observable<boolean> {
    return this.feeClient
      .appendRoute(`/${date}/${memberNumber}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(date: string, memberNumber: number): Observable<Fee> {
    return this.feeClient
      .appendRoute(`/${date}/${memberNumber}`)
      .read<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getPersons(page: number, active: Active): Observable<PaginatedResponse<Person>> {
    return this.personClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Person>>();
  }

  public getOnePerson(id: number): Observable<Person> {
    return this.personClient
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

}

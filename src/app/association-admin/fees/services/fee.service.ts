import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginationParams } from '@app/core/api/client/pagination-params';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { FeePayment } from '@app/models/fees/fee-payment';
import { Person } from '@app/models/person/person';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Fee } from '../../../models/fees/fee';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Fee): Observable<FeePayment> {
    return this.getClient()
      .create<SimpleResponse<FeePayment>>(data)
      .pipe(map(r => r.content));
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.getClient()
      .appendRoute('/pay')
      .create<SimpleResponse<FeePayment>>(data)
      .pipe(map(r => r.content));
  }

  public update(date: string, memberNumber: number, data: Fee): Observable<Fee> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .update<SimpleResponse<Fee>>(data)
      .pipe(map(r => r.content));
  }

  public delete(date: string, memberNumber: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(date: string, memberNumber: number): Observable<Fee> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .read<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getPersons(page: number, active: Active): Observable<PaginatedResponse<Person[]>> {
    return this.getPersonClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Person[]>>();
  }

  public getOnePerson(id: number): Observable<Person> {
    return this.getPersonClient()
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Person>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/fee');
  }

  private getPersonClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/person');
  }

}

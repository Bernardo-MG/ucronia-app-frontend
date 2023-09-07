import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { AngularRequest } from '@app/core/api/repository/angular-request';
import { CrudRepository } from '@app/core/api/repository/crud-repository';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeePayment } from '../models/fee-payment';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';

@Injectable()
export class FeeService {

  private feePaymentRepository: CrudRepository<FeePayment>;

  constructor(
    private http: HttpClient,
    private client: AssociationApiClient
  ) {
    this.feePaymentRepository = new CrudRepository<FeePayment>(() => new AngularRequest(this.http, environment.apiUrl + '/fee'));
  }

  public getAll(pagination: PaginationRequest | undefined, startDate: string | undefined, endDate: string | undefined): Observable<PaginatedResponse<Fee[]>> {
    const defaultSortName = new Sort<Fee>('memberName');
    defaultSortName.order = 'asc';
    const defaultSortDate = new Sort<Fee>('date');
    defaultSortDate.order = 'desc';

    const query = new PaginatedQuery<Fee>();
    query.defaultSort = [defaultSortDate, defaultSortName];
    query.pagination = pagination;
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.client.fee().readAll(query);
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.feePaymentRepository.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Fee): Observable<Fee> {
    return this.client.fee().updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.fee().deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Fee> {
    return this.client.fee().readById(id).pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.sort = [new Sort<Member>('name')];
    query.page = page;

    return this.client.member().readAll(query);
  }

  public getOneMember(id: number): Observable<Member> {
    return this.client.member().readById(id).pipe(map(r => r.content));
  }

}

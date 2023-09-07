import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { AngularHttpOperations } from '@app/core/api/repository/angular-http-operations';
import { CrudRepository } from '@app/core/api/repository/crud-repository';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeePayment } from '../models/fee-payment';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';

@Injectable()
export class FeeService {

  private feeRepository: CrudRepository<Fee>;

  private feePaymentRepository: CrudRepository<FeePayment>;

  private memberRepository: CrudRepository<Member>;

  constructor(
    private http: HttpClient
  ) {
    this.feeRepository = new CrudRepository<Fee>(new AngularHttpOperations(this.http, environment.apiUrl + '/fee'));
    this.feePaymentRepository = new CrudRepository<FeePayment>(new AngularHttpOperations(this.http, environment.apiUrl + '/fee'));
    this.memberRepository = new CrudRepository<Member>(new AngularHttpOperations(this.http, environment.apiUrl + '/member'));
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

    return this.feeRepository.readAll(query);
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.feePaymentRepository.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Fee): Observable<Fee> {
    return this.feeRepository.id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.feeRepository.id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Fee> {
    return this.feeRepository.readById(id).pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.sort = [new Sort<Member>('name')];
    query.page = page;

    return this.memberRepository.readAll(query);
  }

  public getOneMember(id: number): Observable<Member> {
    return this.memberRepository.readById(id).pipe(map(r => r.content));
  }

}

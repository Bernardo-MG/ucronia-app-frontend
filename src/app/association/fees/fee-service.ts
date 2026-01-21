import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { FeeCreation, FeeUpdate, UcroniaClient } from '@ucronia/api';
import { Fee, FeePayment, Member, MemberStatus, Profile } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly memberClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.memberClient = clientProvider.url(environment.apiUrl + '/profile/member');
  }

  public create(data: FeeCreation): Observable<FeePayment> {
    return this.ucroniaClient.fee.create(data);
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.ucroniaClient.fee.pay(data);
  }

  public update(member: number, month: Date, data: FeeUpdate): Observable<Fee> {
    return this.ucroniaClient.fee.update(member, month, data);
  }

  public delete(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.delete(member, month);
  }

  public getOne(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.one(member, month);
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

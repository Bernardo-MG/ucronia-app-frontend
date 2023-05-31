import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { FormType } from '@app/shared/edition/models/form-type';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.client.member().page(pagination).sort(pagination?.sort).readAll();
  }

  public create(data: Member): Observable<Member> {
    return this.client.member().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.client.member().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.member().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.client.member().id(id).readOne().pipe(map(r => r.content));
  }

  public countActive(): Observable<number> {
    return this.client.member().parameter("active", true).readAll().pipe(map(r => r.totalElements));
  }

  public getFields(): FormDescription[] {
    return [
      new FormDescription('Name', 'name', FormType.string, Validators.required),
      new FormDescription('Surname', 'surname', FormType.string),
      new FormDescription('Identifier', 'identifier', FormType.string),
      new FormDescription('Phone', 'phone', FormType.string),
      new FormDescription('Active', 'active', FormType.boolean, Validators.required)
    ];
  }

}

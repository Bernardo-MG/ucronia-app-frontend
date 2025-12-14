import { Injectable, inject } from '@angular/core';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { MemberCreation, MemberPatch } from '@ucronia/api';
import { Contact, ContactMethod, Member, MemberContact, MemberStatus } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable, expand, forkJoin, map, of, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly client;
  private readonly contactClient;
  private readonly contactMethodClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
    this.contactClient = clientProvider.url(environment.apiUrl + '/contact');
    this.contactMethodClient = clientProvider.url(environment.apiUrl + '/contact/contactMethod');
  }

  public getAll(page: number, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Member>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    let status;
    if (active) {
      status = active.toString().toUpperCase();
    } else {
      status = '';
    }
    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', status)
      .parameter('name', name)
      .read<PaginatedResponse<Member>>();
  }

  public getContact(number: number): Observable<MemberContact> {
    return forkJoin({
      member: this.getOne(number),
      contact: this.getMemberContact(number)
    }).pipe(
      map(({ member, contact }) => ({
        ...contact,
        ...member
      }))
    );
  }

  public create(data: MemberCreation): Observable<Member> {
    return this.client
      .create<SimpleResponse<Member>>(data)
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  public patch(data: MemberContact): Observable<MemberContact> {
    return forkJoin({
      member: this.patchMember(data),
      contact: this.patchContact(data)
    }).pipe(
      map(({ member, contact }) => ({
        ...contact,
        ...member
      }))
    );
  }

  public getAllContactMethods(): Observable<ContactMethod[]> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );
    const pageSize = 100;

    return this.contactMethodClient
      .loadParameters(new PaginationParams(1, pageSize))
      .loadParameters(sorting)
      .read<PaginatedResponse<ContactMethod>>()
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.contactMethodClient
              .loadParameters(new PaginationParams(nextPage, pageSize))
              .loadParameters(sorting)
              .read<PaginatedResponse<ContactMethod>>();
          }
          return of();
        }),
        // accumulate from all pages into one array
        reduce((methods: ContactMethod[], res?: PaginatedResponse<ContactMethod>) => {
          return res ? [...methods, ...res.content] : methods;
        }, [])
      );
  }

  private getMemberContact(number: number): Observable<Contact> {
    return this.contactClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Contact>>()
      .pipe(map(r => r.content));
  }

  private getOne(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  private patchMember(data: MemberPatch): Observable<Member> {
    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Member>>(data)
      .pipe(map(r => r.content));
  }

  private patchContact(data: Contact): Observable<Contact> {
    return this.contactClient
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Contact>>(data)
      .pipe(map(r => r.content));
  }

}

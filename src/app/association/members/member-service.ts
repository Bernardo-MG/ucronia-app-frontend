import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { ContactPatch, MemberCreation, MemberPatch } from '@ucronia/api';
import { Contact, Member, MemberContact, MemberStatus } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { Observable, catchError, forkJoin, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly messageService = inject(MessageService);

  private readonly client;
  private readonly contactClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/member');
    this.contactClient = clientProvider.url(environment.apiUrl + '/contact');
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
      .pipe(
        map(r => r.content),
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Datos creados',
            life: 3000
          });
        })
      );
  }

  public update(data: MemberContact): Observable<MemberContact> {
    const contactPatch: ContactPatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };

    return forkJoin({
      member: this.patchMember(data),
      contact: this.patchContact(contactPatch)
    }).pipe(
      map(({ member, contact }) => ({
        ...contact,
        ...member
      })),
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Actualizado',
          detail: 'Datos actualizados',
          life: 3000
        });
      })
    );
  }

  public delete(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Member>>()
      .pipe(
        map(r => r.content),
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Datos borrados',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar el registro',
            life: 5000
          });
          return throwError(() => error);
        })
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

  private patchContact(data: ContactPatch): Observable<Contact> {
    return this.contactClient
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Contact>>(data)
      .pipe(map(r => r.content));
  }

}

import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { ContactCreation, ContactPatch } from '@ucronia/api';
import { Contact, Guest, Member, MemberStatus, Sponsor } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly messageService = inject(MessageService);

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact');
  }

  public getAll(page: number | undefined = undefined, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Contact>> {
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
      .read<PaginatedResponse<Contact>>();
  }

  public create(data: ContactCreation): Observable<Contact> {
    return this.client
      .create<SimpleResponse<Contact>>(data)
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

  public update(data: Contact): Observable<Contact> {
    const patch: ContactPatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };

    return this.client
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Contact>>(patch)
      .pipe(
        map(r => r.content),
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

  public delete(number: number): Observable<Contact> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Contact>>()
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

  public getOne(number: number): Observable<Contact> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Contact>>()
      .pipe(map(r => r.content));
  }

  public convertToMember(number: number): Observable<Member> {
    return this.client
      .appendRoute(`/${number}/member`)
      .update<SimpleResponse<Member>>(undefined)
      .pipe(
        map(r => r.content),
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

  public convertToSponsor(number: number): Observable<Sponsor> {
    return this.client
      .appendRoute(`/${number}/sponsor`)
      .update<SimpleResponse<Sponsor>>(undefined)
      .pipe(
        map(r => r.content),
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

  public convertToGuest(number: number): Observable<Guest> {
    return this.client
      .appendRoute(`/${number}/guest`)
      .update<SimpleResponse<Guest>>(undefined)
      .pipe(
        map(r => r.content),
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

}

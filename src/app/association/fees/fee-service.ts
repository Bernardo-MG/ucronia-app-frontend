import { inject, Injectable } from '@angular/core';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { FeeCreation, FeeUpdate, UcroniaClient } from '@ucronia/api';
import { Fee, FeePayments, MemberStatus, Profile, PublicMember } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: FeeCreation): Observable<Fee> {
    return this.ucroniaClient.fee.create(data)
      .pipe(
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

  public pay(data: FeePayments): Observable<Fee[]> {
    return this.ucroniaClient.fee.pay(data)
      .pipe(
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

  public update(member: number, month: Date, data: FeeUpdate): Observable<Fee> {
    return this.ucroniaClient.fee.update(member, month, data)
      .pipe(
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

  public delete(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.delete(member, month)
      .pipe(
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

  public getOne(member: number, month: Date): Observable<Fee> {
    return this.ucroniaClient.fee.get(member, month);
  }

  public searchMembers(query: string, active: MemberStatus = MemberStatus.Active): Observable<PublicMember[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(undefined, 10, sorting, active, query)
      .pipe(map(page => page.content as PublicMember[]));
  }

  public getOneProfile(id: number): Observable<Profile> {
    return this.ucroniaClient.profile.get(id);
  }

}

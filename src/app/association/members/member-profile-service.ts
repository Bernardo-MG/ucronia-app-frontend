import { inject, Injectable } from '@angular/core';
import { MemberCreation, MemberUpdate, UcroniaClient } from '@ucronia/api';
import { Member } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public getOne(number: number): Observable<Member> {
    return this.ucroniaClient.memberProfile.get(number);
  }

  public create(data: MemberCreation): Observable<Member> {
    return this.ucroniaClient.memberProfile.create(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Socio creado',
            life: 3000
          });
        })
      );
  }

  public update(number: number, data: MemberUpdate): Observable<Member> {
    return this.ucroniaClient.memberProfile.update(number, data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Socio actualizado',
            life: 3000
          });
        })
      );
  }

  public delete(number: number): Observable<Member> {
    return this.ucroniaClient.memberProfile.delete(number)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Socio borrado',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar el socio',
            life: 5000
          });
          return throwError(() => error);
        })
      );
  }

  public delete(number: number): Observable<Member> {
    return this.ucroniaClient.memberProfile.delete(number).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Borrado',
          detail: 'Socio borrado',
          life: 3000
        });
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo borrar el socio',
          life: 5000
        });
        return throwError(() => error);
      })
    );
  }

}

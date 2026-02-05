import { Injectable, inject } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Profile, ProfileCreation, ProfilePatch, SecurityClient } from '@bernardo-mg/security';
import { GuestPatch, MemberProfilePatch, SponsorPatch, UcroniaClient, mergeProperties } from '@ucronia/api';
import { Guest, Member, MemberProfile, MemberProfileFeeType, MemberStatus, Sponsor } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, catchError, concat, forkJoin, last, map, of, switchMap, tap, throwError } from 'rxjs';
import { ProfileInfo } from './model/profile-info';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private readonly securityClient = inject(SecurityClient);

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public getAll(
    page: number | undefined = undefined,
    sort: Sorting,
    active: MemberStatus,
    name: string,
    filterType: 'all' | 'guest' | 'member' | 'sponsor' = 'all'
  ): Observable<Page<ProfileInfo>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('firstName'),
          new SortingProperty('lastName'),
          new SortingProperty('number')
        ]
      )
    );

    let query;

    if (filterType === 'guest') {
      query = this.ucroniaClient.guest.page(page, undefined, sorting, name);
    } else if (filterType === 'member') {
      query = this.ucroniaClient.memberProfile.page(page, undefined, sorting, active, name);
    } else if (filterType === 'sponsor') {
      query = this.ucroniaClient.sponsor.page(page, undefined, sorting, name);
    } else {
      query = this.securityClient.profile.page(page, undefined, sorting, name);
    }

    return query;
  }


  public create(data: ProfileCreation): Observable<Profile> {
    return this.securityClient.profile
      .create(data)
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

  public update(data: ProfileInfo): Observable<Profile> {
    const update = this.updateProfile(data);
    const observables: Observable<any>[] = [update];

    if (data.types.includes("guest")) {
      const guest: Guest = {
        ...data,
        games: data.games ? data.games as Date[] : []
      };
      observables.push(this.updateGuest(guest));
    }

    if (data.types.includes("member")) {
      const member: MemberProfile = {
        ...data,
        feeType: data.feeType ? data.feeType : new MemberProfileFeeType(),
        active: data.active ? true : false,
        renew: data.renew ? true : false
      };
      observables.push(this.updateMember(member));
    }

    if (data.types.includes("sponsor")) {
      const sponsor: Sponsor = {
        ...data,
        years: data.years ? data.years as number[] : []
      };
      observables.push(this.updateSponsor(sponsor));
    }

    return concat(...observables)
      .pipe(
        last(),
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

  public delete(number: number): Observable<Profile> {
    return this.securityClient.profile
      .delete(number)
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

  public getOne(number: number): Observable<ProfileInfo> {
    return this.securityClient.profile
      .get(number)
      .pipe(
        switchMap(profile => {
          const requests: Observable<any>[] = [];

          if (profile.types?.includes('guest')) {
            requests.push(this.ucroniaClient.guest.get(number));
          }

          if (profile.types?.includes('member')) {
            requests.push(this.ucroniaClient.memberProfile.get(number));
          }

          if (profile.types?.includes('sponsor')) {
            requests.push(this.ucroniaClient.sponsor.get(number));
          }

          if (requests.length === 0) {
            return of(profile);
          }

          return forkJoin(requests).pipe(
            map(results => {
              return Object.assign({}, profile, ...results);
            })
          );
        })
      );
  }

  public convertToMember(number: number, feeType: number): Observable<Member> {
    return this.ucroniaClient.profile.transform.toMember(number, feeType)
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

  public convertToSponsor(number: number): Observable<Sponsor> {
    return this.ucroniaClient.profile.transform.toSponsor(number)
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

  public convertToGuest(number: number): Observable<Guest> {
    return this.ucroniaClient.profile.transform.toGuest(number)
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

  private updateProfile(data: Profile): Observable<Profile> {
    const patch: ProfilePatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };
    return this.securityClient.profile.patch(data.number, patch);
  }

  private updateGuest(data: Guest): Observable<Guest> {
    const patch: GuestPatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };
    return this.ucroniaClient.guest.patch(data.number, patch);
  }

  private updateSponsor(data: Sponsor): Observable<Sponsor> {
    const patch: SponsorPatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };
    return this.ucroniaClient.sponsor.patch(data.number, patch);
  }

  private updateMember(data: MemberProfile): Observable<MemberProfile> {
    const patch: MemberProfilePatch = {
      ...data,
      feeType: data.feeType.number,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };
    return this.ucroniaClient.memberProfile.patch(data.number, patch);
  }

}

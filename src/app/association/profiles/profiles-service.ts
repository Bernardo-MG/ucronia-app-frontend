import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { GuestPatch, MemberProfilePatch, ProfileCreation, ProfilePatch, SponsorPatch } from '@ucronia/api';
import { Guest, Member, MemberProfile, MemberStatus, Profile, Sponsor } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { Observable, catchError, concat, forkJoin, last, map, of, switchMap, tap, throwError } from 'rxjs';
import { ProfileInfo } from './model/contact-info';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private readonly messageService = inject(MessageService);

  private readonly client;
  private readonly guestClient;
  private readonly memberClient;
  private readonly sponsorClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/profile');
    this.guestClient = clientProvider.url(environment.apiUrl + '/profile/guest');
    this.memberClient = clientProvider.url(environment.apiUrl + '/profile/member');
    this.sponsorClient = clientProvider.url(environment.apiUrl + '/profile/sponsor');
  }profile

  public getAll(
    page: number | undefined = undefined,
    sort: Sorting,
    active: MemberStatus,
    name: string,
    filterType: 'all' | 'guest' | 'member' | 'sponsor' = 'all'
  ): Observable<PaginatedResponse<ProfileInfo>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    const status = active ? active.toString().toUpperCase() : '';

    let clientToUse;
    if (filterType === 'guest') {
      clientToUse = this.guestClient;
    } else if (filterType === 'member') {
      clientToUse = this.memberClient;
    } else if (filterType === 'sponsor') {
      clientToUse = this.sponsorClient;
    } else {
      clientToUse = this.client;
    }

    return clientToUse
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .parameter('status', status)
      .parameter('name', name)
      .read<PaginatedResponse<ProfileInfo>>();
  }


  public create(data: ProfileCreation): Observable<Profile> {
    return this.client
      .create<SimpleResponse<Profile>>(data)
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

  public update(data: ProfileInfo): Observable<Profile> {
    const update = this.updateContact(data);
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
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<Profile>>()
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

  public getOne(number: number): Observable<ProfileInfo> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<ProfileInfo>>()
      .pipe(
        map(r => r.content),
        switchMap(profile => {
          const requests: Observable<any>[] = [];

          if (profile.types?.includes('guest')) {
            requests.push(
              this.guestClient
                .appendRoute(`/${number}`)
                .read<SimpleResponse<Guest>>()
                .pipe(map(resp => resp.content))
            );
          }

          if (profile.types?.includes('member')) {
            requests.push(
              this.memberClient
                .appendRoute(`/${number}`)
                .read<SimpleResponse<Member>>()
                .pipe(map(resp => resp.content))
            );
          }

          if (profile.types?.includes('sponsor')) {
            requests.push(
              this.sponsorClient
                .appendRoute(`/${number}`)
                .read<SimpleResponse<Sponsor>>()
                .pipe(map(resp => resp.content))
            );
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

  private updateContact(data: Profile): Observable<Profile> {
    const patch: ProfilePatch = {
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
      .patch<SimpleResponse<Profile>>(patch)
      .pipe(map(r => r.content));
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

    return this.guestClient
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Guest>>(patch)
      .pipe(map(r => r.content));
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

    return this.sponsorClient
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<Sponsor>>(patch)
      .pipe(map(r => r.content));
  }

  private updateMember(data: MemberProfile): Observable<MemberProfile> {
    const patch: MemberProfilePatch = {
      ...data,
      contactChannels: data.contactChannels.map(c => {
        return {
          method: c.method.number,
          detail: c.detail
        }
      })
    };

    return this.memberClient
      .appendRoute(`/${data.number}`)
      .patch<SimpleResponse<MemberProfile>>(patch)
      .pipe(map(r => r.content));
  }

}

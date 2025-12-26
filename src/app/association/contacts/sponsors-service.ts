import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { Sponsor } from '@ucronia/domain';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { SponsorPatch } from 'projects/ucronia/api/src/lib/sponsor/sponsor-patch';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SponsorsService {

  private readonly messageService = inject(MessageService);

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact/sponsor');
  }

  public update(data: Sponsor): Observable<Sponsor> {
    const patch: SponsorPatch = {
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
      .patch<SimpleResponse<Sponsor>>(patch)
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

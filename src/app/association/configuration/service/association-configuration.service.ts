import { Injectable } from '@angular/core';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { Observable, map } from 'rxjs';
import { AssociationConfiguration } from '../models/association-configuration';

@Injectable()
export class AssociationConfigurationService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public get(): Observable<AssociationConfiguration> {
    return this.client.configuration().readOne().pipe(map(r => r.content));
  }

}

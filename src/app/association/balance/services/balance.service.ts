import { Injectable } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getBalance(): Observable<Balance> {
    return this.client.balance().readOne().pipe(map(r => r.content));
  }

}

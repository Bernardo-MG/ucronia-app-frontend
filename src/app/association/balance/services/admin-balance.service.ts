import { Injectable } from '@angular/core';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Balance } from '@app/models/balance';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBalanceService {

  private balanceUrl = environment.apiUrl + "/balance";

  constructor(
    private client: RequestClient
  ) { }

  public getBalance(): Observable<Balance> {
    const clt: ReadOperations<Balance> = this.client.read(this.balanceUrl);
    return clt.fetchOne().pipe(map(r => r.content));
  }

}

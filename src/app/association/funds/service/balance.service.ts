import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceApi } from '@app/association/api/balance-api';
import { Balance } from '@app/association/models/balance';
import { Observable, map } from 'rxjs';

@Injectable()
export class BalanceService {

  private balanceApi = new BalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public read(): Observable<Balance[]> {
    return this.balanceApi.read().pipe(map(r => r.content));
  }

}

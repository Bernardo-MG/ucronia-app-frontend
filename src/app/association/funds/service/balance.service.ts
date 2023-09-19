import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceApi } from '@app/association/api/balance-api';
import { MonthlyBalance } from '@app/association/funds/models/monthly-balance';
import { Observable, map } from 'rxjs';

@Injectable()
export class BalanceService {

  private balanceApi = new BalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public monthly(): Observable<MonthlyBalance[]> {
    return this.balanceApi.readMonthly().pipe(map(r => r.content));
  }

}

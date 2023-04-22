import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Fee } from "@app/association/models/fee";
import { Member } from "@app/association/models/member";
import { Transaction } from "@app/association/models/transaction";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { environment } from "environments/environment";
import { AngularReadOperations } from "./angular-read-operations";
import { BalanceQuery } from "./query/balance-query";
import { CrudQuery } from "./query/crud-query";
import { FeeCalendarQuery } from "./query/fee-calendar-query";
import { TransactionRangeQuery } from "./query/transaction-range-query";

@Injectable({
  providedIn: 'root'
})
export class AssociationApiClient {

  private rootUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public balance(): BalanceQuery {
    return new BalanceQuery(this.getReadOperations());
  }

  public fee(): CrudQuery<Fee> {
    return new CrudQuery<Fee>(this.http, this.rootUrl + '/transaction');
  }

  public feeCalendar(): FeeCalendarQuery {
    return new FeeCalendarQuery(this.getReadOperations());
  }

  public member(): CrudQuery<Member> {
    return new CrudQuery<Member>(this.http, this.rootUrl + '/member');
  }

  public transaction(): CrudQuery<Transaction> {
    return new CrudQuery<Transaction>(this.http, this.rootUrl + '/transaction');
  }

  public transactionRange(): TransactionRangeQuery {
    return new TransactionRangeQuery(this.getReadOperations());
  }

  private getReadOperations(): ReadOperations {
    return new AngularReadOperations(this.http, this.rootUrl);
  }

}
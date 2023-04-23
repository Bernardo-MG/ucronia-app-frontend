import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Balance } from "@app/association/models/balance";
import { Fee } from "@app/association/models/fee";
import { Member } from "@app/association/models/member";
import { Transaction } from "@app/association/models/transaction";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { environment } from "environments/environment";
import { HttpOperations } from "./http-operations";
import { CrudQuery } from "./query/crud-query";
import { FeeCalendarQuery } from "./query/fee-calendar-query";
import { ReadQuery } from "./query/read-query";

@Injectable({
  providedIn: 'root'
})
export class AssociationApiClient {

  private rootUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public balance(): ReadQuery<Balance> {
    return new ReadQuery<Balance>(new HttpOperations(this.http, this.rootUrl + '/balance'));
  }

  public fee(): CrudQuery<Fee> {
    return new CrudQuery<Fee>(new HttpOperations(this.http, this.rootUrl + '/transaction'));
  }

  public feeCalendar(): FeeCalendarQuery {
    return new FeeCalendarQuery(new HttpOperations(this.http, this.rootUrl + '/fee/calendar'));
  }

  public member(): CrudQuery<Member> {
    return new CrudQuery<Member>(new HttpOperations(this.http, this.rootUrl + '/member'));
  }

  public transaction(): CrudQuery<Transaction> {
    return new CrudQuery<Transaction>(new HttpOperations(this.http, this.rootUrl + '/transaction'));
  }

  public transactionRange(): ReadQuery<TransactionCalendarRange> {
    return new ReadQuery<TransactionCalendarRange>(new HttpOperations(this.http, this.rootUrl + '/transaction'));
  }

}
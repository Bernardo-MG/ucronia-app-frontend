import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssociationConfiguration } from "@app/association/configuration/models/association-configuration";
import { Balance } from "@app/association/models/balance";
import { Fee } from "@app/association/models/fee";
import { Member } from "@app/association/models/member";
import { Transaction } from "@app/association/models/transaction";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";
import { ReadRepository } from "../repository/read-repository";
import { FeeCalendarClient } from "./fee-calendar-client";
import { TransactionCalendarClient } from "./transaction-calendar-client";
import { FeePayment } from "@app/association/fees/models/fee-payment";

@Injectable({
  providedIn: 'root'
})
export class AssociationApiClient {

  private rootUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public balance(): ReadRepository<Balance> {
    return new ReadRepository<Balance>(() => new AngularRequest(this.http, this.rootUrl + '/balance'));
  }

  public fee(): CrudRepository<Fee> {
    return new CrudRepository<Fee>(() => new AngularRequest(this.http, this.rootUrl + '/fee'));
  }

  public feeCalendar(): FeeCalendarClient {
    return new FeeCalendarClient(() => new AngularRequest(this.http, this.rootUrl + '/fee/calendar'));
  }

  public feePayment(): CrudRepository<FeePayment> {
    return new CrudRepository<FeePayment>(() => new AngularRequest(this.http, environment.apiUrl + '/fee'));
  }

  public member(): CrudRepository<Member> {
    return new CrudRepository<Member>(() => new AngularRequest(this.http, this.rootUrl + '/member'));
  }

  public transaction(): CrudRepository<Transaction> {
    return new CrudRepository<Transaction>(() => new AngularRequest(this.http, this.rootUrl + '/transaction'));
  }

  public transactionCalendar(): TransactionCalendarClient {
    return new TransactionCalendarClient(() => new AngularRequest(this.http, this.rootUrl + '/transaction/calendar'));
  }

  public transactionRange(): ReadRepository<TransactionCalendarRange> {
    return new ReadRepository<TransactionCalendarRange>(() => new AngularRequest(this.http, this.rootUrl + '/transaction/range'));
  }

  public configuration(): CrudRepository<AssociationConfiguration> {
    return new CrudRepository<AssociationConfiguration>(() => new AngularRequest(this.http, this.rootUrl + '/configuration/association'));
  }

}
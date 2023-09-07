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

  private balanceRepository = new ReadRepository<Balance>(() => new AngularRequest(this.http, this.rootUrl + '/balance'));

  private feeRepository = new CrudRepository<Fee>(() => new AngularRequest(this.http, this.rootUrl + '/fee'));

  private feeCalendarRepository = new FeeCalendarClient(() => new AngularRequest(this.http, this.rootUrl + '/fee/calendar'));

  private feePaymentRepository = new CrudRepository<FeePayment>(() => new AngularRequest(this.http, environment.apiUrl + '/fee'));

  private memberRepository = new CrudRepository<Member>(() => new AngularRequest(this.http, this.rootUrl + '/member'));

  private transactionRepository = new CrudRepository<Transaction>(() => new AngularRequest(this.http, this.rootUrl + '/transaction'));

  private transactionCalendarRepository = new TransactionCalendarClient(() => new AngularRequest(this.http, this.rootUrl + '/transaction/calendar'));

  private transactionRangeRepository = new ReadRepository<TransactionCalendarRange>(() => new AngularRequest(this.http, this.rootUrl + '/transaction/range'));

  private configurationRepository = new CrudRepository<AssociationConfiguration>(() => new AngularRequest(this.http, this.rootUrl + '/configuration/association'));

  constructor(
    private http: HttpClient
  ) { }

  public balance(): ReadRepository<Balance> {
    return this.balanceRepository;
  }

  public fee(): CrudRepository<Fee> {
    return this.feeRepository;
  }

  public feeCalendar(): FeeCalendarClient {
    return this.feeCalendarRepository;
  }

  public feePayment(): CrudRepository<FeePayment> {
    return this.feePaymentRepository;
  }

  public member(): CrudRepository<Member> {
    return this.memberRepository;
  }

  public transaction(): CrudRepository<Transaction> {
    return this.transactionRepository;
  }

  public transactionCalendar(): TransactionCalendarClient {
    return this.transactionCalendarRepository;
  }

  public transactionRange(): ReadRepository<TransactionCalendarRange> {
    return this.transactionRangeRepository;
  }

  public configuration(): CrudRepository<AssociationConfiguration> {
    return this.configurationRepository;
  }

}
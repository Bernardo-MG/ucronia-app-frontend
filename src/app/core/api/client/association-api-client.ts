import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssociationConfiguration } from "@app/association/configuration/models/association-configuration";
import { FeePayment } from "@app/association/fees/models/fee-payment";
import { Balance } from "@app/association/models/balance";
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";
import { ReadRepository } from "../repository/read-repository";
import { FeeCalendarClient } from "./fee-calendar-client";

@Injectable({
  providedIn: 'root'
})
export class AssociationApiClient {

  private balanceRepository = new ReadRepository<Balance>(() => new AngularRequest(this.http, environment.apiUrl + '/balance'));

  private feeCalendarRepository = new FeeCalendarClient(() => new AngularRequest(this.http, environment.apiUrl + '/fee/calendar'));

  private feePaymentRepository = new CrudRepository<FeePayment>(() => new AngularRequest(this.http, environment.apiUrl + '/fee'));

  private transactionRangeRepository = new ReadRepository<TransactionCalendarRange>(() => new AngularRequest(this.http, environment.apiUrl + '/transaction/range'));

  private configurationRepository = new CrudRepository<AssociationConfiguration>(() => new AngularRequest(this.http, environment.apiUrl + '/configuration/association'));

  constructor(
    private http: HttpClient
  ) { }

  public balance(): ReadRepository<Balance> {
    return this.balanceRepository;
  }

  public feeCalendar(): FeeCalendarClient {
    return this.feeCalendarRepository;
  }

  public feePayment(data: FeePayment): Observable<ApiResponse<FeePayment>> {
    return this.feePaymentRepository.create(data);
  }

  public transactionRange(): ReadRepository<TransactionCalendarRange> {
    return this.transactionRangeRepository;
  }

  public configuration(): CrudRepository<AssociationConfiguration> {
    return this.configurationRepository;
  }

}
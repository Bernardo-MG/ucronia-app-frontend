import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Transaction } from "../funds/models/transaction";
import { TransactionCalendarRange } from "../funds/models/transaction-calendar-range";

export class TransactionApi extends CrudApi<Transaction> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/funds/transaction'))
  }

}
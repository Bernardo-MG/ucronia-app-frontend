import { HttpClient } from "@angular/common/http";
import { Balance } from "@app/association/models/balance";
import { environment } from "environments/environment";
import { AngularRequest } from "../../core/api/request/angular-request";
import { ReadApi } from "../../core/api/repository/read-api";

export class BalanceApi extends ReadApi<Balance> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/balance'))
  }

}
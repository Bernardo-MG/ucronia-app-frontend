import { HttpClient } from "@angular/common/http";
import { Balance } from "@app/association/models/balance";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { ReadRepository } from "../repository/read-repository";

export class BalanceApi extends ReadRepository<Balance> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/balance'))
  }

}
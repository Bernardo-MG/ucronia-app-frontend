import { HttpClient } from "@angular/common/http";
import { FeePayment } from "@app/association/fees/models/fee-payment";
import { Fee } from "@app/association/models/fee";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";

export class FeeApi extends CrudRepository<Fee> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/fee'))
  }

  public pay(data: FeePayment): Observable<ApiResponse<FeePayment>> {
    const request = this.requestProvider();

    return request.create(data);
  }

}
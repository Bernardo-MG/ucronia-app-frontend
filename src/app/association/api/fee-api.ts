import { HttpClient } from "@angular/common/http";
import { FeePayment } from "@app/association/fees/models/fee-payment";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Fee } from "../fees/models/fee";

export class FeeApi {

  constructor(
    private http: HttpClient
  ) { }

  public pay(data: FeePayment): Observable<ApiResponse<FeePayment>> {
    return this.getRequest().create(data);
  }

  public updateById(date: string, memberNumber: number, data: Fee): Observable<ApiResponse<Fee>> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).update(data);
  }

  public deleteById(date: string, memberNumber: number): Observable<ApiResponse<boolean>> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).delete();
  }

  public readById(date: string, memberNumber: number): Observable<ApiResponse<Fee>> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee');
  }

}
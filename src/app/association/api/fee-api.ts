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
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(date: string, memberNumber: number, data: Fee): Observable<ApiResponse<Fee>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);

    return request.update(data);
  }

  public deleteById(date: string, memberNumber: number): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);

    return request.delete();
  }

  public readById(date: string, memberNumber: number): Observable<ApiResponse<Fee>> {
    const request = this.getRequest();

    request.appendRoute(`/${date}/${memberNumber}`);
    return request.read();
  }

  private getRequest() {
    return new AngularRequest(this.http, environment.apiUrl + '/fee');
  }

}
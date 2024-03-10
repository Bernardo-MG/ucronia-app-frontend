import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Transaction } from "../transactions/models/transaction";

export class TransactionApi {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Transaction): Observable<ApiResponse<Transaction>> {
    const request = this.getRequest();

    return request.create(data);
  }

  public updateById(id: any, data: Transaction): Observable<ApiResponse<Transaction>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.update(data);
  }

  public deleteById(id: any): Observable<ApiResponse<boolean>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);

    return request.delete();
  }

  public readById(id: any): Observable<ApiResponse<Transaction>> {
    const request = this.getRequest();

    request.appendRoute(`/${id}`);
    return request.read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/transaction');
  }

}
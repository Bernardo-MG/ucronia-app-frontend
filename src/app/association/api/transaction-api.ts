import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedQuery } from "@app/core/api/models/paginated-query";
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

  protected requestWithQuery(query: PaginatedQuery<any>): Request {
    const request = this.getRequest();

    // Sort
    request.sort(query.sort);

    // Other parameters
    for (const key in query.parameters) {
      const value = query.parameters[key];
      if (value) {
        request.parameter(key, value);
      }
    }

    return request;
  }

}
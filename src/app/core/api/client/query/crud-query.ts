import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { PaginationRequest } from "@app/core/api/models/pagination-request";
import { Observable } from "rxjs";
import { Sort } from "../../models/sort";
import { HttpOperations } from "../http-operations";
import { CrudQueryById } from "./crud-query-by-id";
import { HttpClient } from "@angular/common/http";

export class CrudQuery<T> {

  private operations: HttpOperations;

  constructor(
    http: HttpClient,
    rootUrl: string
  ) {
    this.operations = new HttpOperations(http, rootUrl);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    return this.operations.body(data).create();
  }

  public read(): Observable<PaginatedResponse<T[]>> {
    return this.operations.read();
  }

  public id(id: number): CrudQueryById<T> {
    this.operations.appendRoute(`/${id}`);
    return new CrudQueryById<T>(this.operations);
  }

  public parameter(name: string, value: any): CrudQuery<T> {
    this.operations = this.operations.parameter(name, value);

    return this;
  }

  public page(pagination: PaginationRequest | undefined): CrudQuery<T> {
    this.operations.page(pagination);

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): CrudQuery<T> {
    this.operations.sort(sort);

    return this;
  }

}
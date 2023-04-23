import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { PaginationRequest } from "@app/core/api/models/pagination-request";
import { Sort } from "@app/core/api/models/sort";
import { Observable } from "rxjs";
import { HttpOperations } from "../http-operations";
import { CrudQueryById } from "./crud-query-by-id";

export class CrudQuery<T> {

  constructor(
    private operations: HttpOperations
  ) { }

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
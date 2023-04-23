import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { Observable } from "rxjs";
import { HttpOperations } from "../http-operations";
import { CrudQueryById } from "./crud-query-by-id";
import { ReadQuery } from "./read-query";

export class CrudQuery<T> extends ReadQuery<T> {

  constructor(
    private oper: HttpOperations
  ) {
    super(oper);
  }

  public create(data: T): Observable<ApiResponse<T>> {
    return this.oper.body(data).create();
  }

  public read(): Observable<PaginatedResponse<T[]>> {
    return this.oper.read();
  }

  public id(id: number): CrudQueryById<T> {
    this.oper.appendRoute(`/${id}`);
    return new CrudQueryById<T>(this.oper);
  }

}
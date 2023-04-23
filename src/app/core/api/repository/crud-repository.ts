import { ApiResponse } from "@app/core/api/models/api-response";
import { PaginatedResponse } from "@app/core/api/models/paginated-response";
import { Observable } from "rxjs";
import { CrudByIdRepository } from "./crud-by-id-repository";
import { HttpOperations } from "./http-operations";
import { ReadRepository } from "./read-repository";

export class CrudRepository<T> extends ReadRepository<T> {

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

  public id(id: number): CrudByIdRepository<T> {
    this.oper.appendRoute(`/${id}`);
    return new CrudByIdRepository<T>(this.oper);
  }

}
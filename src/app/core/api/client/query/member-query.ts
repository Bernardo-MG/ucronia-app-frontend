import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";
import { Observable } from "rxjs";
import { CreateOperations } from "../create-operations";
import { DeleteOperations } from "../delete-operations";
import { UpdateOperations } from "../update-operations";
import { MemberQueryByIndex as MemberQueryById } from "./member-query-by-index";

export class MemberQuery {

  private memberRoute = '/member';

  constructor(
    private readOperations: ReadOperations,
    private createOperations: CreateOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) {
    this.readOperations.appendRoute(this.memberRoute);
    this.createOperations.appendRoute(this.memberRoute);
    this.updateOperations.appendRoute(this.memberRoute);
    this.deleteOperations.appendRoute(this.memberRoute);
  }

  public parameter(name: string, value: any): MemberQuery {
    this.readOperations = this.readOperations.parameter(name, value);

    return this;
  }

  public fetch(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.readOperations.page(pagination).sort(pagination?.sort).fetch();
  }

  public create(data: Member): Observable<ApiResponse<Member>> {
    return this.createOperations.body(data).push();
  }

  public update(id: number, data: Member): Observable<ApiResponse<Member>> {
    return this.updateOperations.id(id).body(data).push();
  }

  public delete(id: number): Observable<ApiResponse<Member>> {
    return this.deleteOperations.id(id).push();
  }

  public id(index: number): MemberQueryById {
    this.readOperations.appendRoute(`/${index}`);
    this.createOperations.appendRoute(`/${index}`);
    return new MemberQueryById(this.readOperations);
  }

}
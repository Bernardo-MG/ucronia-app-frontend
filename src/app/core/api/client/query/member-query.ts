import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";
import { Observable } from "rxjs";
import { CreateOperations } from "../create-operations";
import { MemberQueryByIndex as MemberQueryById } from "./member-query-by-index";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";

export class MemberQuery {

  private memberRoute = '/member';

  constructor(
    private readOperations: ReadOperations,
    private createOperations: CreateOperations
  ) {
    this.readOperations.appendRoute(this.memberRoute);
    this.createOperations.appendRoute(this.memberRoute);
  }

  public fetch(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.readOperations.page(pagination).sort(pagination?.sort).fetch();
  }

  public create(data: Member): Observable<ApiResponse<Member>> {
    return this.createOperations.body(data).push();
  }

  public id(index: number): MemberQueryById {
    this.readOperations.appendRoute(`/${index}`);
    this.createOperations.appendRoute(`/${index}`);
    return new MemberQueryById(this.readOperations);
  }

}
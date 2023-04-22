import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { Observable } from "rxjs";
import { MemberQueryByIndex as MemberQueryById } from "./member-query-by-index";
import { PaginationRequest } from "@app/shared/utils/api/models/pagination-request";

export class MemberQuery {

  private memberRoute = '/member';

  constructor(
    private operations: ReadOperations
  ) {
    this.operations.appendRoute(this.memberRoute);
  }

  public fetch(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.operations.page(pagination).sort(pagination?.sort).fetch();
  }

  public id(index: number): MemberQueryById {
    this.operations.appendRoute(`/${index}`);
    return new MemberQueryById(this.operations);
  }

}
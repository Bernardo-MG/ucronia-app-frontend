import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { PaginatedResponse } from "@app/shared/utils/api/models/paginated-response";
import { Observable } from "rxjs";
import { MemberQueryByIndex as MemberQueryById } from "./member-query-by-index";

export class MemberQuery {

  private memberRoute = '/member';

  constructor(
    private operations: ReadOperations
  ) {
    this.operations.appendRoute(this.memberRoute);
  }

  public fetch(): Observable<PaginatedResponse<Member[]>> {
    return this.operations.fetch();
  }

  public id(index: number): MemberQueryById {
    this.operations.appendRoute(`/${index}`);
    return new MemberQueryById(this.operations);
  }

}
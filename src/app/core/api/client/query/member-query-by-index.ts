import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";

export class MemberQueryByIndex {

  constructor(
    private operations: ReadOperations
  ) {  }

  public fetch(): Observable<ApiResponse<Member>> {
    return this.operations.fetch();
  }

}
import { Member } from "@app/association/models/member";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";
import { ReadOperations } from "../read-operations";

export class MemberQueryByIndex {

  constructor(
    private readOperations: ReadOperations
  ) {  }

  public fetch(): Observable<ApiResponse<Member>> {
    return this.readOperations.fetch();
  }

}
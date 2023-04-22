import { Member } from "@app/association/models/member";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";
import { DeleteOperations } from "../delete-operations";
import { ReadOperations } from "../read-operations";
import { UpdateOperations } from "../update-operations";

export class MemberQueryById {

  constructor(
    private readOperations: ReadOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) { }

  public read(): Observable<ApiResponse<Member>> {
    return this.readOperations.fetch();
  }

  public update(data: Member): Observable<ApiResponse<Member>> {
    return this.updateOperations.body(data).push();
  }

  public delete(): Observable<ApiResponse<Member>> {
    return this.deleteOperations.push();
  }

}
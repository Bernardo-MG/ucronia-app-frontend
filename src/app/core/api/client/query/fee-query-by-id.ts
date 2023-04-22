import { Fee } from "@app/association/models/fee";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";
import { DeleteOperations } from "../delete-operations";
import { ReadOperations } from "../read-operations";
import { UpdateOperations } from "../update-operations";

export class FeeQueryById {

  constructor(
    private readOperations: ReadOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) { }

  public read(): Observable<ApiResponse<Fee>> {
    return this.readOperations.fetch();
  }

  public update(data: Fee): Observable<ApiResponse<Fee>> {
    return this.updateOperations.body(data).push();
  }

  public delete(): Observable<ApiResponse<Fee>> {
    return this.deleteOperations.push();
  }

}
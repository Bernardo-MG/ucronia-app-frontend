import { Transaction } from "@app/association/models/transaction";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";
import { DeleteOperations } from "../delete-operations";
import { ReadOperations } from "../read-operations";
import { UpdateOperations } from "../update-operations";

export class TransactionQueryById {

  constructor(
    private readOperations: ReadOperations,
    private updateOperations: UpdateOperations,
    private deleteOperations: DeleteOperations
  ) { }

  public read(): Observable<ApiResponse<Transaction>> {
    return this.readOperations.fetch();
  }

  public update(data: Transaction): Observable<ApiResponse<Transaction>> {
    return this.updateOperations.body(data).push();
  }

  public delete(): Observable<ApiResponse<Transaction>> {
    return this.deleteOperations.push();
  }

}
import { TransactionCalendarRange } from "@app/association/models/transaction-calendar-range";
import { ApiResponse } from "@app/shared/utils/api/models/api-response";
import { Observable } from "rxjs";
import { ReadOperations } from "../read-operations";

export class TransactionRangeQuery {

  private transactionRangeUrl = "/transaction/range";

  constructor(
    private readOperations: ReadOperations
  ) {
    readOperations.route(this.transactionRangeUrl);
  }

  public read(): Observable<ApiResponse<TransactionCalendarRange>> {
    return this.readOperations.fetch();
  }

}
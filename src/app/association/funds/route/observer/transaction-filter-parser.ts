import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";
import { TransactionFilter } from "../../models/transaction-filter";

export class TransactionFilterParser implements ParametersParser<TransactionFilter> {

  parse(params: ParamMap): TransactionFilter | undefined {
    let filter;

    if ((params.has('startDate')) || (params.has('endDate')) || (params.has('date'))) {
      filter = new TransactionFilter();

      if (params.has('date')) {
        const date = (params.get('date') as string);
        filter.date = date;
      }

      if (params.has('startDate')) {
        const date = (params.get('startDate') as string);
        filter.startDate = date;
      }

      if (params.has('endDate')) {
        const date = (params.get('endDate') as string);
        filter.endDate = date;
      }
    } else {
      filter = undefined;
    }

    return filter;
  }

}
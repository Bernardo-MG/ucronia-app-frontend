import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/route/observer/parameters-parser";
import { TransactionFilter } from "../../models/transaction-filter";

export class TransactionFilterParser implements ParametersParser<TransactionFilter> {

  constructor() { }

  parse(params: ParamMap): TransactionFilter | undefined {
    let filter;
    let date;

    if ((params.has('startDate'))||(params.has('endDate'))||(params.has('date'))) {
      filter = new TransactionFilter();

      if (params.has('date')) {
        const dateText = (params.get('date') as string);
        date = new Date(dateText);
        if (isNaN(date.getTime())) {
          date = undefined;
        }
        filter.date = date;
      }
    } else {
      filter = undefined;
    }

    return filter;
  }

}
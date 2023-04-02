import { ParamMap } from "@angular/router";
import { ParametersParser } from "../observer/parameters-parser";

export class DateParametersParser implements ParametersParser<Date> {

  constructor() { }

  parse(params: ParamMap): Date | undefined {
    let date;

    if (params.has('date')) {
      const dateText = (params.get('date') as string);
      date = new Date(dateText);
      if (isNaN(date.getTime())) {
        date = undefined;
      }
    } else {
      date = undefined;
    }

    return date;
  }

}
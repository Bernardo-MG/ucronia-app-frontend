import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";

export class YearParametersParser implements ParametersParser<number> {

  public parse(params: ParamMap): number | undefined {
    let year;

    if (params.has('year')) {
      year = Number(params.get('year'));
    } else {
      year = undefined;
    }

    return year;
  }

}
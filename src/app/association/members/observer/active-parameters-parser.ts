import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";
import { Active } from "../models/active";

export class ActiveParametersParser implements ParametersParser<Active> {

  public parse(params: ParamMap): Active | undefined {
    let active;

    if (params.has('active')) {
      let param = params.get('active') as string;
      param = param.charAt(0).toUpperCase() + param.slice(1);
      active = Active[param as ('Active' | 'Inactive' | 'All')];
    } else {
      active = undefined;
    }

    return active;
  }

}
import { ParamMap } from "@angular/router";

export interface RouteParametersReader<T> {

  read(params: ParamMap): T | undefined;

}
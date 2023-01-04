import { ParamMap } from "@angular/router";

export interface ParametersReader<T> {

  read(params: ParamMap): T | undefined;

}
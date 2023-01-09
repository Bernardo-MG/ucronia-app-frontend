import { ParamMap } from "@angular/router";

/**
 * Reads the route parameters and transforms them into an object.
 */
export interface ParametersParser<T> {

  /**
   * Builds the parsed object from the route parameters.
   * 
   * @param params route parameters with the data to parse
   */
  parse(params: ParamMap): T | undefined;

}
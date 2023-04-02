import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";
import { Sort } from "../../../models/sort";

/**
 * Parses a {@link Sort} from the route parameters.
 * 
 * The parameters used to parse are:
 * - sort, containing a key-value properties in a 'key,value' format. There may be multiple sort arguments.
 */
export class SortParametersParser implements ParametersParser<Sort<any>[]> {

  constructor() { }

  public parse(params: ParamMap): Sort<any>[] | undefined {
    let pageSort: Sort<any> | undefined;
    let pageSorts: Sort<any>[] | undefined;
    let pageSortValues: string[] | null;

    // Only builds the sort when there is at least one sort parameter
    if (params.has('sort')) {
      pageSorts = [];
      pageSortValues = params.getAll('sort');
      for (var i = 0; i < pageSortValues.length; i += 1) {
        const pageSortValue = pageSortValues[i];
        if (pageSortValue) {
          pageSort = this.parseFromPair(pageSortValue);
          if (pageSort) {
            pageSorts.push(pageSort);
          }
        }
      }
      if (pageSorts.length === 0) {
        pageSorts = undefined;
      }
    } else {
      pageSorts = undefined;
    }

    return pageSorts;
  }

  /**
   * Parses a {@link Sort} from a key-value pair, in the 'key,value' format.
   * 
   * @param pair key-value pair
   * @returns the equivalent sort, or undefined if it is invalid
   */
  private parseFromPair(pair: string): Sort<any> | undefined {
    let splitPair: string[];
    let sort: Sort<any> | undefined;
    let property: string;
    let direction: string;

    splitPair = pair.split(',');
    // Acquire the property and check it is not empty
    property = splitPair[0];
    if (property.length > 0) {
      // Contains a property
      sort = new Sort<any>(property);

      if (splitPair.length > 1) {
        // It contains a direction
        direction = splitPair[1];
        if ((direction === 'desc') || (direction === 'asc')) {
          // Valid direction
          sort.order = direction;
        } else {
          // Invalid direction
          // Applies default direction
          sort.order = 'asc';
        }
      } else {
        // No direction
        // Applies default direction
        sort.order = 'asc';
      }
    } else {
      // No property
      // Invalid sort
      sort = undefined;
    }

    return sort;
  }

}
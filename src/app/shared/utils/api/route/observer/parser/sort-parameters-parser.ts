import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";
import { SortField } from "../../../../../../core/api/models/sort-field";
import { Direction } from "@app/core/api/models/direction";

/**
 * Parses a {@link SortField} from the route parameters.
 * 
 * The parameters used to parse are:
 * - sort, containing a key-value properties in a 'key,value' format. There may be multiple sort arguments.
 */
export class SortParametersParser implements ParametersParser<SortField[]> {

  public parse(params: ParamMap): SortField[] | undefined {
    let pageSort: SortField | undefined;
    let pageSorts: SortField[] | undefined;
    let pageSortValues: string[] | null;

    // Only builds the sort when there is at least one sort parameter
    if (params.has('sort')) {
      pageSorts = [];
      pageSortValues = params.getAll('sort');
      for (let i = 0; i < pageSortValues.length; i += 1) {
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
   * Parses a {@link SortField} from a key-value pair, in the 'key,value' format.
   * 
   * @param pair key-value pair
   * @returns the equivalent sort, or undefined if it is invalid
   */
  private parseFromPair(pair: string): SortField | undefined {
    let sort: SortField | undefined;
    let direction: string;

    // Acquire the property and check it is not empty
    const splitPair: string[] = pair.split(',');
    const property: string = splitPair[0];
    if (property.length > 0) {
      // Contains a property
      sort = new SortField(property);

      if (splitPair.length > 1) {
        // It contains a direction
        direction = splitPair[1];
        if (direction === 'desc') {
          // Valid direction
          sort.direction = Direction.Descending;
        } else {
          // Default or invalid direction
          sort.direction = Direction.Ascending;
        }
      } else {
        // No direction
        // Applies default direction
        sort.direction = Direction.Ascending;
      }
    } else {
      // No property
      // Invalid sort
      sort = undefined;
    }

    return sort;
  }

}
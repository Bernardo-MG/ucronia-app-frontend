import { ParamMap } from "@angular/router";
import { ParametersParser } from "@app/shared/utils/route/observer/parameters-parser";
import { Pagination } from "@bernardo-mg/request";
import { SortParametersParser } from "./sort-parameters-parser";

/**
 * Parses a {@link Pagination} from the route parameters.
 * 
 * The parameters used to parse are:
 * - page, containing the page number. Optional.
 * - size, containing the page size. Optional.
 * - Sorting, delegated to {@link SortParametersParser}. Optional.
 */
export class PaginationRequestParametersParser implements ParametersParser<Pagination> {

  /**
   * Parsing the sort object is delegated to this parser.
   */
  private sortParser = new SortParametersParser();

  public parse(params: ParamMap): Pagination | undefined {
    let pagination;

    if ((params.has('page')) || (params.has('size')) || (params.has('sort'))) {
      pagination = new Pagination();

      if (params.has('page')) {
        pagination.page = Number(params.get('page'));
        if (Number.isNaN(pagination.page)) {
          // The page was not a number
          pagination.page = undefined;
        }
      }

      if (params.has('size')) {
        pagination.size = Number(params.get('size'));
        if (Number.isNaN(pagination.size)) {
          // The size was not a number
          pagination.size = undefined;
        }
      }
    } else {
      pagination = undefined;
    }

    return pagination;
  }

}
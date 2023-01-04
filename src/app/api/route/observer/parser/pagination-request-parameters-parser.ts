import { ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { ParametersParser } from "@app/route/observer/parameters-parser";
import { SortParametersParser } from "./sort-parameters-parser";

/**
 * Parses a {@link PaginationRequest} from the route parameters.
 * 
 * The parameters used to parse are:
 * - page, containing the page number. Optional.
 * - size, containing the page size. Optional.
 * - sort, delegated to {@link SortParametersParser}. Optional.
 */
export class PaginationRequestParametersParser implements ParametersParser<PaginationRequest> {

  /**
   * Parsing the sort object is delegated to this parser.
   */
  private sortParser = new SortParametersParser();

  constructor() { }

  public parse(params: ParamMap): PaginationRequest | undefined {
    let request;

    if ((params.has('page')) || (params.has('size')) || (params.has('sort'))) {
      request = new PaginationRequest();

      if (params.has('page')) {
        request.page = Number(params.get('page'));
        if (Number.isNaN(request.page)) {
          // The page was not a number
          request.page = undefined;
        }
      }

      if (params.has('size')) {
        request.size = Number(params.get('size'));
        if (Number.isNaN(request.size)) {
          // The size was not a number
          request.size = undefined;
        }
      }

      if (params.has('sort')) {
        request.sort = this.sortParser.parse(params);
      }
    } else {
      request = undefined;
    }

    return request;
  }

}
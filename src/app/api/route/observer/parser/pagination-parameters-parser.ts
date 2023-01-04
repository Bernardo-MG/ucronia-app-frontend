import { ParamMap } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";
import { ParametersParser } from "@app/route/observer/parameters-parser";

export class PaginationParametersParser implements ParametersParser<Pagination> {

  constructor() { }

  public parse(params: ParamMap): Pagination | undefined {
    let pagination;

    // Only builds the pagination when the current page is declared
    if (params.has('page')) {
      pagination = new Pagination();
      pagination.page = Number(params.get('page'));

      // If the page size was declared then it is included
      if (params.has('size')) {
        pagination.size = Number(params.get('size'));
        if (Number.isNaN(pagination.size)) {
          // The size was not a number
          pagination.size = undefined;
        }
      }
    } else {
      // No current page declared
      // No pagination
      pagination = undefined;
    }

    if ((pagination) && (Number.isNaN(pagination.page))) {
      // Failed to parse the page
      pagination = undefined;
    }

    return pagination;
  }

}
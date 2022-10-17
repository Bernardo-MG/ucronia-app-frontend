import { ParamMap } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";

export class RoutePaginationReader {

  constructor() { }

  public read(params: ParamMap): Pagination | undefined {
    const pageNumber = this.getPageNumber(params);
    const pageSize = this.getSizeNumber(params);

    let pagination;

    if((pageNumber != undefined) && (pageNumber != undefined)){
      pagination = new Pagination();
  
      if (pageNumber != undefined) {
        pagination.page = pageNumber;
      }
      if (pageSize != undefined) {
        pagination.size = pageSize;
      }
    } else {
      pagination = undefined;
    }

    return pagination;
  }

  private getPageNumber(params: ParamMap): number | undefined {
    let pageNumber: number | undefined;

    if (params.has('page')) {
      pageNumber = Number(params.get('page'));
    } else {
      pageNumber = undefined;
    }

    return pageNumber;
  }

  private getSizeNumber(params: ParamMap): number | undefined {
    let pageNumber: number | undefined;

    if (params.has('size')) {
      pageNumber = Number(params.get('size'));
    } else {
      pageNumber = undefined;
    }

    return pageNumber;
  }

}
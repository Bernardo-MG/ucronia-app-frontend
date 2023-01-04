import { ParamMap } from "@angular/router";
import { Sort } from "@app/api/models/sort";
import { ParametersReader } from "@app/route/observer/parameters-reader";

export class SortParametersReader implements ParametersReader<Sort<any>[]> {

  constructor() { }

  public read(params: ParamMap): Sort<any>[] | undefined {
    let pageSort: Sort<any> | undefined;
    let pageSorts: Sort<any>[] | undefined;
    let pageSortValues: string[] | null;

    if (params.has('sort')) {
      pageSorts = [];
      pageSortValues = params.getAll('sort');
      for (var i = 0; i < pageSortValues.length; i += 1) {
        const pageSortValue = pageSortValues[i];
        if (pageSortValue) {
          pageSort = this.getSortFromValue(pageSortValue);
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

  private getSortFromValue(pageSortValue: string): Sort<any> | undefined {
    let pageSortPair: string[];
    let pageSort: Sort<any> | undefined;
    let property: string;
    let direction: string;

    pageSortPair = pageSortValue.split(',');
    property = pageSortPair[0];
    if (property.length > 0) {
      pageSort = new Sort<any>(property);

      if (pageSortPair.length > 1) {
        direction = pageSortPair[1];
        if ((direction === 'desc') || (direction === 'asc')) {
          pageSort.order = direction;
        }
      }
    } else {
      pageSort = undefined;
    }

    return pageSort;
  }

}
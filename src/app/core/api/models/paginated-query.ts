import { Direction } from "./direction";
import { PaginationRequest } from "./pagination-request";
import { Sort } from "./sort";

export class PaginatedQuery<T> {

  public _sort: Sort<T>[] = [];

  public _defaultSort: Sort<T>[] = [];

  public parameters: { [key: string]: any } = {};

  public set sort(sort: Sort<T>[]) {
    this._sort = sort.filter(s => s.direction !== Direction.Unsorted);
  }

  public get sort(): Sort<T>[] {
    let sorts;

    if (this._sort.length === 0) {
      // Use default sorts if no sorting was received
      sorts = this._defaultSort;
    } else {
      // Merge default sorting with the received one

      // Prepare map with defaults
      const defaults = new Map(this._defaultSort.map(s => [s.property, s]));

      // Keep all fields sorted or not in the default list
      const directSort = this._sort
        .filter(s => (s.direction !== Direction.Unsorted) || (!defaults.has(s.property)));

      // Replace unsorted fields with defaults
      const defaultSort = this._sort
        .filter(s => s.direction === Direction.Unsorted)
        .filter(s => defaults.has(s.property))
        .map(s => defaults.get(s.property) as Sort<T>);

      sorts = directSort.concat(defaultSort);
    }

    const sorted = sorts.sort((a, b) => {
      let direction;

      if (a.property.toString() < b.property.toString()) {
        direction = -1;
      } else {
        direction = 1;
      }

      return direction;
    });

    return sorted;
  }

  public set size(size: number) {
    this.parameters['size'] = size;
  }

  public set page(page: number) {
    this.parameters['page'] = page - 1;
  }

  public set defaultSort(defaultSort: Sort<T>[]) {
    this._defaultSort = defaultSort;
  }

  public set pagination(pagination: PaginationRequest | undefined) {
    if (pagination) {
      if (pagination.page) {
        this.page = pagination.page;
      }
      if (pagination.size) {
        this.size = pagination.size;
      }
      if (pagination.sort) {
        this._sort = pagination.sort;
      }
    }
  }

  public addParameter(key: string, value: any) {
    this.parameters[key] = value;
  }

}
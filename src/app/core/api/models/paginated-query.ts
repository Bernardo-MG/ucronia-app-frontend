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
    const defaults = new Map(this._defaultSort.map(s => [s.property, s]));

    // Check all sorts which can't be replaced by defaults
    const directSort = this._sort
      .filter(s => (s.direction !== Direction.Unsorted) || (!defaults.has(s.property)));

    // Replace sorts as needed
    const defaultSort = this._sort
      .filter(s => s.direction === Direction.Unsorted)
      .filter(s => defaults.has(s.property))
      .map(s => defaults.get(s.property) as Sort<T>);

    const sorted = directSort.concat(defaultSort).sort((a, b) => {
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
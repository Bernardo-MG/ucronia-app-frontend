import { Pagination } from "./pagination";
import { Sort } from "./sort";

export class PaginatedQuery {

  public _sort = new Sort([]);

  public _defaultSort = new Sort([]);

  public parameters: { [key: string]: any } = {};

  public set sort(sort: Sort) {
    this._sort = sort;
  }

  public get sort(): Sort {
    let sortFields;

    if (this._sort.fields.length === 0) {
      // Use default sorts if no sorting was received
      sortFields = this._defaultSort.fields;
    } else {
      // Merge default sorting with the received one

      // Prepare map with defaults
      const defaults = new Map(this._defaultSort.fields.map(s => [s.property, s]));

      // Keep all fields not in the default list
      const directSortFields = this._sort.fields
        .filter(s => !defaults.has(s.property));

      // Replace unsorted fields with defaults
      const sortedProperties = this._sort.fields.map(f => f.property);
      const defaultSortFields = this._defaultSort.fields.filter(f => !sortedProperties.includes(f.property));

      sortFields = directSortFields.concat(defaultSortFields);
    }

    // Sort fields alphabetically
    const sortedFields = sortFields.sort((a, b) => {
      let direction;

      if (a.property.toString() < b.property.toString()) {
        direction = -1;
      } else {
        direction = 1;
      }

      return direction;
    });

    return new Sort(sortedFields);
  }

  public set size(size: number) {
    this.parameters['size'] = size;
  }

  public set page(page: number) {
    this.parameters['page'] = page - 1;
  }

  public set defaultSort(defaultSort: Sort) {
    this._defaultSort = defaultSort;
  }

  public set pagination(pagination: Pagination | undefined) {
    if (pagination) {
      if (pagination.page) {
        this.page = pagination.page;
      }
      if (pagination.size) {
        this.size = pagination.size;
      }
    }
  }

  public addParameter(key: string, value: any) {
    this.parameters[key] = value;
  }

}
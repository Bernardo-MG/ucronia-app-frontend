import { PaginationRequest } from "../models/pagination-request";
import { Sort } from "../models/sort";

export class PaginatedQuery<T> {

  public size = 0;

  public page = 0;

  public sort: Sort<T>[] = [];

  public defaultSort: Sort<T>[] = [];

  public parameters: { [key: string]: any } = {};

  public set pagination(pagination: PaginationRequest | undefined) {
    if (pagination) {
      if (pagination.page) {
        // Pages start at 0
        // TODO: Handle before reaching this point
        this.page = pagination.page - 1;
      }
      if (pagination.size) {
        this.size = pagination.size;
      }
      if (pagination.sort) {
        this.sort = pagination.sort;
      }
    }
  }

  public addParameter(key: string, value: any) {
    this.parameters[key] = value;
  }

}
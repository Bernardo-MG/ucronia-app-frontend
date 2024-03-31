import { SimpleResponse } from "./simple-response";

export class ListPaginatedResponse<T> extends SimpleResponse<T[]> {
  page = 0;
  size = 0;
  elementsInPage = 0;
  totalElements = 0;
  totalPages = 0;
  first = false;
  last = false;


  constructor(cont: T[], page: number, size: number) {
    super(cont.slice(size * page, size * (page + 1)));

    this.page = page;
    this.size = size;
    this.totalElements = cont.length;
    this.totalPages = Math.ceil(cont.length / size);
  }
}
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
    super(cont.slice(size * (page - 1), size * page));

    this.page = page;
    this.size = size;
    this.totalElements = cont.length;
    if (size === 0) {
      this.totalPages = 0;
    } else {
      this.totalPages = Math.ceil(cont.length / size);
    }
    this.elementsInPage = this.content.length;

    this.first = (page <= 1);
    this.last = (page >= this.totalPages);
  }
}
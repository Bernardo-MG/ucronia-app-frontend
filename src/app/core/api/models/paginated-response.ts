import { ApiResponse } from "./api-response";

export class PaginatedResponse<T> extends ApiResponse<T> {
  page = 0;
  size = 0;
  elementsInPage = 0;
  totalElements = 0;
  totalPages = 0;
  first = false;
  last = false;

  public get currentPage() {
    return this.page + 1;
  }

}
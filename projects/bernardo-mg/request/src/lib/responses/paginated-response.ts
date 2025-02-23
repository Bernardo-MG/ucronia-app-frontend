import { SimpleResponse } from "./simple-response";

/**
 * Paginated response.
 */
export class PaginatedResponse<T> extends SimpleResponse<T[]> {
  page = 0;
  size = 0;
  elementsInPage = 0;
  totalElements = 0;
  totalPages = 0;
  first = false;
  last = false;

  constructor(cont: T[] = []) {
    super(cont);
  }

}
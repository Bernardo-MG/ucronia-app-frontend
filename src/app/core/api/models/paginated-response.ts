import { SimpleResponse } from "./simple-response";

export class PaginatedResponse<T> extends SimpleResponse<T> {
  page = 0;
  size = 0;
  elementsInPage = 0;
  totalElements = 0;
  totalPages = 0;
  first = false;
  last = false;

}
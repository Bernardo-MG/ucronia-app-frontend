import { SimpleResponse } from "./simple-response";

/**
 * Paginated response created from an array.
 */
export class ArrayPaginatedResponse<T> extends SimpleResponse<T[]> {
  public elementsInPage = 0;
  public totalElements = 0;
  public totalPages = 0;
  public first = false;
  public last = false;

  constructor(content: T[], public page: number, public size: number) {
    super(content.slice(size * (page - 1), size * page));

    this.size = size;
    this.totalElements = content.length;
    if (size === 0) {
      this.totalPages = 0;
    } else {
      this.totalPages = Math.ceil(content.length / size);
    }
    this.elementsInPage = content.length;

    this.first = (page <= 1);
    this.last = (page >= this.totalPages);
  }
}

/**
 * Pagination to be used in the requests.
 */
export class Pagination {
  page?: number;
  size?: number;

  constructor(page?: number, size?: number) {
    this.page = page;
    this.size = size;
  }

}
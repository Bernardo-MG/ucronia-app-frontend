
/**
 * Pagination to be used in the requests.
 */
export class Pagination {

  public page?: number;
  public size?: number;

  constructor(page?: number, size?: number) {
    this.page = page;
    this.size = size;
  }

}
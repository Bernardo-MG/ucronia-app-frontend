
/**
 * Paginated response.
 */
export class Page<T> {
  public page = 0;
  public size = 0;
  public elementsInPage = 0;
  public totalElements = 0;
  public totalPages = 0;
  public first = false;
  public last = false;
  public content: T[] = [];

}
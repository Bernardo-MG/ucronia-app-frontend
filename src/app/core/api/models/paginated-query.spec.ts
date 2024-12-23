import { PaginatedQuery } from "./paginated-query";
import { Pagination } from "./pagination";
import { Sort } from "./sort";
import { SortDirection } from "./sort-direction";
import { SortProperty } from "./sort-field";

describe('PaginatedQuery', () => {

  let paginatedQuery: PaginatedQuery;

  beforeEach(() => {
    paginatedQuery = new PaginatedQuery();
  });

  describe('sort', () => {
    it('should sort properties alphabetically by property name', () => {
      const customSort = new Sort([
        new SortProperty('zname', SortDirection.Ascending),
        new SortProperty('aname', SortDirection.Descending)
      ]);

      paginatedQuery.sort = customSort;

      expect(paginatedQuery.sort.properties).toEqual([
        new SortProperty('aname', SortDirection.Descending),
        new SortProperty('zname', SortDirection.Ascending)
      ]);
    });
  });

  describe('size', () => {
    it('should set size parameter correctly', () => {
      paginatedQuery.size = 10;
      expect(paginatedQuery.parameters['size']).toBe(10);
    });
  });

  describe('page', () => {
    it('should set page parameter correctly', () => {
      paginatedQuery.page = 3;
      expect(paginatedQuery.parameters['page']).toBe(3);
    });
  });

  describe('defaultSort', () => {
    it('should return default sort when no custom sort is set', () => {
      const defaultSort = new Sort([
        new SortProperty('name', SortDirection.Ascending)
      ]);
      paginatedQuery.defaultSort = defaultSort;

      expect(paginatedQuery.sort.properties).toEqual(defaultSort.properties);
    });

    it('should merge custom sort with default sort', () => {
      const defaultSort = new Sort([
        new SortProperty('name', SortDirection.Ascending),
        new SortProperty('age', SortDirection.Descending)
      ]);
      const customSort = new Sort([
        new SortProperty('age', SortDirection.Ascending)
      ]);

      paginatedQuery.defaultSort = defaultSort;
      paginatedQuery.sort = customSort;

      expect(paginatedQuery.sort.properties).toEqual([
        new SortProperty('age', SortDirection.Ascending),
        new SortProperty('name', SortDirection.Ascending)
      ]);
    });

    it('should use custom sort instead of default sort', () => {
      const defaultSort = new Sort([
        new SortProperty('name', SortDirection.Ascending),
        new SortProperty('age', SortDirection.Descending)
      ]);
      const customSort = new Sort([
        new SortProperty('name', SortDirection.Descending)
      ]);

      paginatedQuery.defaultSort = defaultSort;
      paginatedQuery.sort = customSort;

      expect(paginatedQuery.sort.properties).toEqual([
        new SortProperty('age', SortDirection.Descending),
        new SortProperty('name', SortDirection.Descending)
      ]);
    });

    it('should use default sort when the custom is unsorted', () => {
      const defaultSort = new Sort([
        new SortProperty('name', SortDirection.Descending),
        new SortProperty('age', SortDirection.Descending)
      ]);
      const customSort = new Sort([
        new SortProperty('name', SortDirection.Unsorted)
      ]);

      paginatedQuery.defaultSort = defaultSort;
      paginatedQuery.sort = customSort;

      expect(paginatedQuery.sort.properties).toEqual([
        new SortProperty('age', SortDirection.Descending),
        new SortProperty('name', SortDirection.Descending)
      ]);
    });
  });

  describe('pagination', () => {
    it('should set page and size from pagination object', () => {
      const pagination = new Pagination(2, 20);
      paginatedQuery.pagination = pagination;

      expect(paginatedQuery.parameters['page']).toBe(2);
      expect(paginatedQuery.parameters['size']).toBe(20);
    });

    it('should not set page or size if pagination is undefined', () => {
      paginatedQuery.pagination = undefined;
      expect(paginatedQuery.parameters['page']).toBeUndefined();
      expect(paginatedQuery.parameters['size']).toBeUndefined();
    });
  });

  describe('addParameter', () => {
    it('should add a parameter correctly', () => {
      paginatedQuery.addParameter('filter', 'active');
      expect(paginatedQuery.parameters['filter']).toBe('active');
    });

    it('should overwrite an existing parameter', () => {
      paginatedQuery.addParameter('filter', 'active');
      paginatedQuery.addParameter('filter', 'inactive');
      expect(paginatedQuery.parameters['filter']).toBe('inactive');
    });
  });

});

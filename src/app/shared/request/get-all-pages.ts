import { Page } from '@bernardo-mg/request';
import { EMPTY, expand, Observable, reduce } from 'rxjs';

export function getAllPages<T>(
  loadPage: (page: number | undefined, size: number) => Observable<Page<T>>,
  firstPage: number | undefined,
  nextPage: (page: Page<T>, index: number) => number | undefined = page => page.page + 1
): Observable<T[]> {
  const pageSize = 100;

  return loadPage(firstPage, pageSize).pipe(
    expand((page, index) => {
      const next = page.last ? undefined : nextPage(page, index);
      return next === undefined ? EMPTY : loadPage(next, pageSize);
    }),
    reduce((items, page) => items.concat(page.content), [] as T[])
  );
}
